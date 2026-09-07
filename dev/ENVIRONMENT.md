# Running the full stack

Everything needed to bring up **every** service in `club`, and every environment
variable each one reads.

## TL;DR

```bash
# 0. one time: local base images (opensrcs/base, base-slim, rekoni-base, ...)
cd dev/base-image && ./build.sh && cd ..

# 1. build everything - TypeScript via Rush, Rust/Go via plain docker build
rush docker:full

# 2. start it
rush docker:up:full

# 3. app at http://club.local:8087   (needs `127.0.0.1 club.local` in /etc/hosts)
```

Credential-gated integrations stay down until you opt in:

```bash
cd dev
docker compose -f docker-compose.yaml -f docker-compose.ext.yaml -f docker-compose.full.yaml \
  --profile google --profile github --profile telegram --profile ai --profile payment up -d
```

### Empty is not the same as unset

Most of these services validate credentials with `!== undefined`, so an **empty**
env var passes the check and the service then crashes trying to use it. Compose
cannot conditionally omit a `VAR=${VAR:-}` line, so anything that should default
to "absent" uses Compose's bare `- VAR` form instead, and `dev/.env` keeps those
keys **commented out** rather than assigned to "". If you blank a key in `.env`
instead of commenting it, expect a crash-loop:

- `GOOGLE_CLIENT_ID=` made `account` throw `OAuth2Strategy requires a clientID option`
- `STRIPE_API_KEY=` made `payment` throw `Neither apiKey nor config.authenticator provided`

## Why the build is two commands

`rush docker:build` only knows about TypeScript projects in the Rush workspace.
Seven services are not TypeScript and are invisible to it:

| Image | Language | Source | Notes |
|---|---|---|---|
| `opensrcs/clubkvs` | Rust | `foundations/clubkvs` | Dockerfile is at `clubkvs_server/Dockerfile`, context is the workspace root |
| `opensrcs/clublake` | Rust | `foundations/clublake` | runs `cargo test` during the image build |
| `opensrcs/clubpulse` | Rust | `foundations/clubpulse` | |
| `opensrcs/clubgun` | Rust | `foundations/clubgun` | |
| `opensrcs/clubgram` | Rust | `foundations/clubgram` | |
| `opensrcs/club-ai-agent` | Rust | `foundations/club-ai-agent` | pinned to `rust:1.86`, others use `1.88` |
| `opensrcs/stream` | Go | `foundations/stream` | |

All six Rust services depend on the shared `clubrs` crate via a relative path
(`clubrs = { path = "../clubrs" }`). That path escapes the Docker build context,
so each build injects clubrs as a **named build context** and the Dockerfile
picks it up with `COPY --from=clubrs`:

```bash
docker build --build-context clubrs=foundations/clubrs -f <dockerfile> <context>
```

`common/scripts/docker_native.sh` does this for all seven. Run the whole set with
`rush docker:native`, or a subset with `./common/scripts/docker_native.sh clubkvs clubgun`.

> `pods/external` was the old mechanism here - it pulled prebuilt upstream images
> and retagged them. Its `services.d/clubgun.service` and `clubkvs.service` are
> disabled (leading `-`), which is why those two images never appeared and the
> stack failed with "image not found". Build from local source instead; `club` is
> the source of truth for these crates now.

## Compose layout

| File | Contents |
|---|---|
| `docker-compose.yaml` | Core stack: datastores, transactor, account, front, and the always-on services |
| `docker-compose.ext.yaml` | `payment` + `billing` |
| `docker-compose.full.yaml` | Everything else: ai-bot, love, mail, mail-worker, notification, plus the credential-gated integrations |
| `docker-compose.min.yaml` | Trims the stack for constrained machines |
| `docker-compose.pg.yaml` | Swaps CockroachDB for PostgreSQL |

`docker-compose.full.yaml` also adds three support containers so the Tier-1
services work with no external accounts at all:

- **mongodb** (`:27017`) - `ai-bot`'s document store, the one service still on Mongo
- **mailpit** (`:1025` SMTP, `:8025` web) - a local SMTP sink, so `mail` and
  `calendar-mailer` really deliver and you read the results in a browser
- **livekit** (`:7880`) - a dev SFU so `love` (virtual office) has something to talk to

## Ports

| Port | Service | | Port | Service |
|---|---|---|---|---|
| 8087 | **front** (the app) | | 4030 | datalake |
| 3000 | account | | 4039 | backup-api |
| 3332 | transactor | | 4040 | preview |
| 3078 | collaborator | | 4041 | link-preview |
| 3500 | github *(profile)* | | 4042 | billing *(ext)* |
| 4004 | rekoni | | 4702 | fulltext |
| 4005 | print | | 4900 | stats |
| 4006 | sign | | 8086 | clubgram |
| 4009 | export | | 8091 | notification |
| 4010 | ai-bot | | 8093 | gmail *(profile)* |
| 4017 | analytics | | 8094 | clubkvs |
| 4020 | telegram-bot *(profile)* | | 8095 | calendar *(profile)* |
| 4021 | mail | | 8096 | clublake |
| 4022 | mail-worker | | 8097 | love |
| 3040 | payment *(ext)* | | 8099 | clubpulse |
| 1080 | stream | | 16686 | jaeger UI |

Infrastructure: cockroach `26257` (UI `8089`), redpanda `19092` (console `8000`),
minio `9000`/`9001`, elastic `9200`, redis `6379`, mongodb `27017`, mailpit
`8025`, livekit `7880`.

Two deliberate port overrides, because the service defaults collide:

- **love** runs on **8097**, not its default 8096 - `clublake` owns 8096.
- **gmail** runs on **8093**, not its default 8087 - `front` owns 8087, and
  `front`'s `GMAIL_URL` already points at 8093.

## Telegram

`clubgram` (Rust, `foundations/clubgram`) is the Telegram account-sync bridge on
`:8086`, and is what `front`'s `TELEGRAM_URL` points at.

The old TypeScript `services/telegram/pod-telegram` was **removed**. It bound the
same port but was abandoned: its endpoint table was initialised empty with every
route commented out behind a `// TODO: FIXME`, so it served nothing. The client
confirms which side is live - `plugins/telegram-resources/src/api.ts` calls
`api/integrations/{phone}`, `/restart` and `/chats`, which are clubgram's routes,
and hardcodes `'clubgram'` as the integration kind. The `plugins/telegram*`,
`models/telegram` and `server-plugins/telegram*` packages are the client side of
this integration and are still in use.

`telegram-bot` is a separate service: the notification *bot*, on `:4020`, behind
the `telegram` profile.

---

# Environment variables

All of these live in `dev/.env`, which docker compose reads automatically
because the rush commands `cd ./dev` first. `dev/.env.example` is the template.

## Core - already set, works out of the box

| Variable | Value in dev | Purpose |
|---|---|---|
| `DB_CR_URL` | `postgresql://root@club.local:26257/defaultdb?sslmode=disable` | CockroachDB, the primary datastore |
| `QUEUE_CONFIG` | `redpanda:9092` | Kafka-compatible event bus |
| `STORAGE_CONFIG` | `datalake\|http://club.local:4030` | Blob storage front door |
| `BACKUP_STORAGE_CONFIG` | `minio\|minio?accessKey=minioadmin&secretKey=minioadmin` | Where backups land |
| `BACKUP_BUCKET_NAME` | `dev-backups` | Backup bucket |
| `CLUB_ADMIN_EMAILS` | your email | Grants admin in the workspace |
| `DB_URL_PG` | `postgres://postgres:postgres@postgres:5432/postgres` | Only for the `pg` overlay |

Not in `.env` because they are hardcoded dev placeholders in the compose files:
`SERVER_SECRET=secret`, `SECRET=secret`, `CLUB_TOKEN_SECRET=secret`, MinIO
`minioadmin`/`minioadmin`. **These are dev-only. Never reuse them anywhere shared.**

## Tier 1 - optional, but no external account needed

These have working defaults in `docker-compose.full.yaml`.

| Variable | Default | Service | Notes |
|---|---|---|---|
| `LIVEKIT_HOST` | `http://club.local:7880` | love | Local dev SFU |
| `LIVEKIT_WS` | `ws://club.local:7880` | front | Client-side LiveKit socket |
| `LIVEKIT_API_KEY` | `devkey` | love | Matches the dev livekit container |
| `LIVEKIT_API_SECRET` | `devsecret...` | love | Same |
| `SMTP_HOST` | `mailpit` | mail | Local sink; set a real relay to send out |
| `SMTP_PORT` | `1025` | mail | |
| `SMTP_USERNAME` / `SMTP_PASSWORD` | empty | mail | mailpit accepts anything |
| `SMTP_TLS_MODE` | `none` | mail | `none` / `upgrade` / `tls` |
| `SMTP_URL` | `smtp://mailpit:1025` | calendar-mailer | Single-URL form |
| `SES_ACCESS_KEY` / `SES_SECRET_KEY` / `SES_REGION` | empty | mail | Use instead of SMTP |
| `PUSH_PUBLIC_KEY` / `PUSH_PRIVATE_KEY` | empty | notification, front | VAPID pair, `npx web-push generate-vapid-keys`. Without it the service runs but browser push is inert |
| `PUSH_SUBJECT` | `mailto:admin@club.local` | notification | |
| `OPENAI_API_KEY` | empty | ai-bot | ai-bot starts without it, just cannot answer |
| `OPENAI_MODEL` | `gpt-4o-mini` | ai-bot, translate | |
| `OPENAI_BASE_URL` | empty | ai-bot, translate | For OpenAI-compatible endpoints |
| `DATALAB_API_KEY` | empty | ai-bot | Document parsing |
| `DEEPGRAM_API_KEY` / `DEEPGRAM_PROJECT_ID` | empty | ai-bot | Meeting transcription |
| `POSTHOG_API_KEY` / `POSTHOG_HOST` | empty | analytics | Product analytics |

## Tier 2 - required, service will not start without them

Each of these validates its whole config at startup and **throws**. That is why
they sit behind compose profiles: enabled with blank credentials they crash-loop
rather than degrade.

### `--profile ai`

| Variable | Service | Notes |
|---|---|---|
| `OPENAI_API_KEY` | **translate** | Required. No default. |
| `AGENT_MODEL` | club-ai-agent | e.g. `anthropic/claude-sonnet-4` |
| `AGENT_PROVIDER` | club-ai-agent | `OpenAI` \| `OpenRouter` \| `Anthropic` |
| `AGENT_PROVIDER_API_KEY` | club-ai-agent | |
| `AGENT_VOYAGEAI_API_KEY` | club-ai-agent | Required, not optional - embeddings for the memory system. https://dash.voyageai.com |
| `AGENT_VOYAGEAI_MODEL` | club-ai-agent | |
| `AGENT_CLUB__BASE_URL` | club-ai-agent | The club instance to log into |
| `AGENT_AGENT_MODE__EMAIL` | club-ai-agent | A real club account for the agent |
| `AGENT_AGENT_MODE__PASSWORD` | club-ai-agent | |
| `AGENT_WEB_SEARCH__API_KEY` | club-ai-agent | Optional. Brave Search. |

`club-ai-agent` reads a baked-in `src/config.yml`; any leaf is overridable with
an `AGENT_` prefix and `__` for nesting (`AGENT_CLUB__BASE_URL` overrides
`club: base_url:`).

### `--profile google`  (gmail only)

`calendar` and `calendar-mailer` are **not** gated: they start fine with no
Google credentials and only need them for per-user integrations at runtime.
Only `gmail` parses a required `Credentials` JSON blob at boot.

| Variable | Notes |
|---|---|
| `GMAIL_CREDENTIALS` | **Required.** Single-line JSON of the Google OAuth client. Reaches the container as `Credentials` - note the non-uppercase name, that is literally what the service reads. |
| `GMAIL_WATCH_TOPIC_NAME` | **Required.** Google Pub/Sub topic for push notifications. |
| `CALENDAR_WATCH_URL` | Publicly reachable callback URL for calendar watches. |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Same OAuth app, broader scopes. Also drives "Sign in with Google". |

`gmail` and `calendar` both need `KVS_URL` (`http://club.local:8094`, wired
already), so **clubkvs must be running** for the Google integrations to work.

### `--profile github`

| Variable | Notes |
|---|---|
| `GITHUB_APP_ID` | **Required.** From https://github.com/settings/apps |
| `GITHUB_APP_CLIENT_ID` | **Required.** |
| `GITHUB_APP_CLIENT_SECRET` | **Required.** |
| `GITHUB_APP_PRIVATE_KEY` | **Required.** The PEM, newlines escaped. |
| `GITHUB_BOT_NAME` | **Required.** The bot handle, no `@`. |
| `GITHUB_APP_WEBHOOK_SECRET` | Webhook verification. |
| `GITHUB_ENTERPRISE_HOSTNAME` | GHES only. |

This is a **GitHub App** (issue/PR sync), distinct from the OAuth App used for
sign-in below.

### `--profile telegram`

| Variable | Notes |
|---|---|
| `TELEGRAM_BOT_TOKEN` | **Required.** From @BotFather. |
| `TELEGRAM_BOT_DOMAIN` | Domain Telegram calls back on. |
| `TELEGRAM_BOT_URL` | Public bot URL shown in the client. Empty hides the entry. |

`clubgram` (the account-sync bridge, always on) is separate and already has
working dev API credentials baked into the base compose.

## Sign-in providers (`account` service)

Passed through by `docker-compose.full.yaml`. The **base compose never passes
these**, so social login is silently unavailable on the base stack alone. Each
provider is skipped entirely if its pair is unset.

| Variable | Notes |
|---|---|
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | https://console.cloud.google.com/apis/credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | An **OAuth App**, not a GitHub App |
| `GITHUB_DISPLAY_NAME` | Button label |
| `OPENID_CLIENT_ID` / `OPENID_CLIENT_SECRET` / `OPENID_ISSUER` | Generic OIDC |
| `OPENID_DISPLAY_NAME` | Button label |

## Payment and billing (`docker-compose.ext.yaml`)

`billing` starts with no credentials. **`payment` does not** - it requires one
complete provider set and throws `Payment provider is not configured` otherwise.
`USE_SANDBOX=true` does **not** substitute for one. So `payment` is behind the
`payment` profile.

Three providers are supported. The service tries them in order and uses the
first whose full credential set is present: **Polar, then Stripe, then Paddle.**

| Variable | Provider | Notes |
|---|---|---|
| `PAYMENT_USE_SANDBOX` | all | Default `true`. Selects sandbox mode for Polar and Paddle. |
| `POLAR_ACCESS_TOKEN` | Polar | |
| `POLAR_WEBHOOK_SECRET` | Polar | |
| `POLAR_ORGANIZATION_ID` | Polar | |
| `POLAR_SUBSCRIPTION_PLANS` | Polar | |
| `STRIPE_API_KEY` | Stripe | |
| `STRIPE_WEBHOOK_SECRET` | Stripe | |
| `STRIPE_SUBSCRIPTION_PLANS` | Stripe | Maps plans to Stripe price ids |
| `PADDLE_API_KEY` | Paddle | Environment-specific: a sandbox key only works with sandbox mode on |
| `PADDLE_WEBHOOK_SECRET` | Paddle | Verifies the `paddle-signature` header |
| `PADDLE_SUBSCRIPTION_PLANS` | Paddle | Maps plans to Paddle price ids (`pri_...`) |
| `PADDLE_CANCEL_EFFECTIVE_FROM` | Paddle | `next_billing_period` (default) or `immediately` |

All three `*_SUBSCRIPTION_PLANS` use the same format, and all four tiers are
required or the provider throws at startup:

```
common@tier:<priceId>;rare@tier:<priceId>;epic@tier:<priceId>;legendary@tier:<priceId>
```

### Paddle specifics

Paddle Billing is a merchant of record, so it differs from Stripe in ways that
show up in configuration, not just code:

- **A default payment link is required.** Paddle has no server-created checkout
  session. The provider creates a *transaction* and uses the hosted checkout URL
  Paddle attaches to it, which only exists if you set a default payment link
  under **Checkout > Settings** in the Paddle dashboard. Without it the service
  raises `Paddle returned no checkout URL`.
- **Webhook endpoint** is `POST /api/v1/webhooks/paddle`. Point your Paddle
  notification destination at it and subscribe to the `subscription.*` and
  `transaction.completed` / `transaction.payment_failed` events.
- **Cancellation is a scheduled change.** Paddle records a pending cancellation
  as a `scheduledChange` rather than a boolean, and can only reverse one while
  it is still scheduled. That is why `PADDLE_CANCEL_EFFECTIVE_FROM` defaults to
  `next_billing_period`: cancelling `immediately` is terminal and permanently
  breaks the uncancel path for that subscription.
- **Metadata is `customData`**, set on the transaction at checkout and inherited
  by the subscription. A subscription without it cannot be attributed to a
  workspace and is skipped with a warning during reconciliation.

| Variable | Default | Notes |
|---|---|---|
| `PAYMENT_USE_SANDBOX` | `true` | Keeps the service from making outbound calls |
| `STRIPE_API_KEY` | empty | |
| `STRIPE_WEBHOOK_SECRET` | empty | |
| `STRIPE_SUBSCRIPTION_PLANS` | empty | Plan id mapping |
| `POLAR_ACCESS_TOKEN` | empty | Polar as an alternative to Stripe |
| `POLAR_WEBHOOK_SECRET` | empty | |
| `POLAR_ORGANIZATION_ID` | empty | |
| `POLAR_SUBSCRIPTION_PLANS` | empty | |

## Troubleshooting

**`image not found` for clubkvs / clublake / clubpulse / clubgun / clubgram / stream**
Those are not built by Rush. Run `rush docker:native`.

**A build fails for no obvious code reason**
`rm -rf common/temp/build-cache`, then rebuild.

**`DeadlineExceeded` pulling base image metadata**
Docker Desktop was still warming up. Pre-pull with
`docker pull rust:1.88 && docker pull rust:1.86 && docker pull golang:1.24.4 && docker pull debian:12-slim`
then rebuild.

**Containers restart-looping right after `up`**
Check for a config `throw`: `docker compose logs <service> | head -30`. A
"Missing env variables: X, Y" line means a Tier-2 service was enabled without
its credentials.

**`fetch failed` / `ECONNREFUSED :3000` in several services at startup**
They started before `account` was ready. Harmless once account is up; the
services retry. If it persists, `account` itself is crash-looping - check its log.

**`_migrations_pkey` uniqueness violations in fulltext and rating**
Benign. Both services apply the same schema migration at startup and the unique
constraint is what makes that idempotent; the loser of the race backs off.

**kafkajs "Request Fetch timed out" / "Restarting the consumer" across services**
Redpanda is starved of CPU, not misconfigured. It runs `--smp 1 --memory 512M`,
so anything saturating the machine (a parallel Rust build, for instance) makes
its Seastar reactor stall and every Kafka consumer time out. Confirm with
`docker logs redpanda | grep "Reactor stalled"`. The consumers recover on their
own once load drops.

**A service crash-loops on a missing env var that looks unrelated to it**
Two library defaults bite services whose compose block omits a variable the rest
of the stack sets. `foundations/server/packages/kafka` falls back to
`QUEUE_CONFIG ?? 'club.local:9092'`, where nothing listens - so a queue consumer
without `QUEUE_CONFIG` fails with `ECONNREFUSED ...:9092` rather than a config
error. And `storageConfigFromEnv()` falls back to the **minio** adapter when
`STORAGE_CONFIG` is unset, producing `Required MINIO_ENDPOINT env to be
configured` in a service that should have been using datalake. In both cases the
fix is to pass the variable, not to satisfy the fallback.

**Memory**
The full stack is roughly 46 containers. Elasticsearch alone is capped at 1 GB
and Redpanda at 512 MB. Give Docker Desktop **at least 12 GB**; at 8 GB the
stack starts but Elasticsearch and the transactor are prone to OOM kills. Use
`rush docker:up:min` on a constrained machine.


---

# Verified end to end

The stack was brought up and exercised on 2026-09-04, macOS arm64, Docker 8 GB:

- **44 containers running, zero errors** in a steady-state window
- Every service port answers HTTP (a 404 on `/` is normal for the API services)
- `front` serves the app on :8087 with HTTP 200
- Signup -> confirmation email delivered through `mail` into mailpit -> account
  confirmed -> session token issued -> **workspace created and reached `active`**,
  which exercises account, transactor, workspace, CockroachDB and datalake together
- `ai-bot` independently registered its own account (its confirmation mail is in
  mailpit too), proving that service reaches `account`

Two bugs fixed along the way:

1. `rekoni` had `STATS_URL=http://club.local:4901`; `stats` listens on **4900**.
   It logged a connection failure every 10 seconds.
2. `payment` and `account` were crash-looping on empty-string credentials - see
   "Empty is not the same as unset" above.
3. Redpanda's healthcheck passed SASL credentials (`-X user=superuser -X
   pass=secretpassword`) to a cluster started with `--mode dev-container`, which
   has no SASL. It failed with `ILLEGAL_SASL_STATE` on every probe, so the
   container was permanently "unhealthy" while the cluster was fine - and any
   `depends_on: condition: service_healthy` on it could never have passed.
