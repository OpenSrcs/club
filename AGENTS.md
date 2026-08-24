# Project Instructions

This file is the operating charter for AI agents working in `club/` - it says what phase
the project is in and what agents are and are not allowed to do on their own initiative.
It intentionally does not duplicate build/run instructions - see "Where things are
documented" below for those.

## Ground rules (always apply)

- Do not run build commands automatically for verification. When finishing work, state
  that the task is complete and ask the user to verify it manually.
- Do not run `git init`, create a GitHub remote/repo, push, or publish a package unless the
  user explicitly asks for that specific action in that message. These are one-time,
  hard-to-reverse, externally-visible actions (see Phase 3 and Phase 4 below) - never do
  them speculatively "to save a step."
- Do not create, modify, or delete AWS resources unless the user explicitly asks for that
  specific action. This costs real money against the user's AWS credits and can affect a
  live service once Phase 5 is underway.
- Never commit secrets. This codebase has many `*_SECRET`, `*_KEY`, and credential env vars
  (see `ARCHITECTURE_OVERVIEW.md`) - the values used in local dev (`SERVER_SECRET=secret`,
  MinIO `minioadmin`/`minioadmin`, etc.) are dev-only placeholders and must never be reused
  or hardcoded anywhere destined for a shared or production environment.
- This is a Rush monorepo - always use `rush`/`rushx`, never bare `npm install`/`npm run`
  inside a package (see README.md for the full command set).

## Where things are documented

- **Build, install, Docker, running locally**: `README.md`
- **Service architecture, ports, env vars, data flow diagrams**: `ARCHITECTURE_OVERVIEW.md`
- **Code style, naming, project structure conventions**: `.github/copilot-instructions.md`
- **Workspace-level context** (how `club/` relates to `club-selfhost/`, `club-examples/`,
  `communication/`): `../CLAUDE.md`

## Roadmap

`club` is being taken from "runs locally" to "independently git-hosted, published, and
deployed as OpenSrcs Club." The phases below are the rough order of that journey. They are not strictly linear -
day-to-day feature and bugfix work (Phase 2) happens throughout, not just after Phase 1
is "done."

### Phase 1 - Run it 100% locally

Goal: the full Docker stack (`rush docker:build && rush docker:up`, see README.md) boots
clean and every service in `ARCHITECTURE_OVERVIEW.md`'s service table is not just "container
is up" but actually functional end-to-end - sign-up, workspace creation, and the core apps
(chat, project management, CRM, HRM, ATS) all work against each other.

Agent guidance: this is local, reversible, low-risk work. Debug failing builds/services,
fix Dockerfiles, fix config, and iterate freely. This is the phase where the "do not
auto-verify with a build" ground rule matters most - build and run things to debug, but
report status and hand verification back to the user rather than declaring victory
yourself.

### Phase 2 - Modify and diverge from upstream

Goal: product decisions and new features specific to OpenSrcs Club.

Agent guidance: normal feature/bugfix work. Follow `.github/copilot-instructions.md`
conventions (strict TypeScript, named exports, `@opensrcs/club-rig` for tooling config,
etc.).

### Phase 3 - Turn into real git projects, push to GitHub

None of the four sibling directories under `OpenSrcs/` (`club`, `club-selfhost`,
`club-examples`, `communication`) are git repositories yet. Initializing one, making a first
commit, adding a GitHub remote, and pushing is a deliberate, one-time action per repo - it's
the point where local work becomes externally visible and starts accumulating a permanent
history.

Agent guidance:

- Never run `git init`, create a repo on GitHub, add a remote, or push unless asked for
  that specific action right now.
- When asked, confirm before acting: which repo(s), which GitHub org/account (the existing
  docs link to `github.com/opensrcs/*`, but don't assume that's still the target without
  asking), and public vs. private.
- Once a repo exists, follow the standard git safety protocol: never force-push, never
  skip hooks (`--no-verify`), never amend a commit that's already been pushed, always
  create new commits rather than rewriting history, and run `git status`/`git diff` before
  anything that could discard work.
- `communication/` is meant to be consumed as a git submodule of `club` (see its
  `README.md`) - if/when it becomes its own repo, wiring it back in as a submodule of
  `club` is part of this phase, not optional cleanup.

### Phase 4 - Publish packages to npm

The `@opensrcs/*` packages under `club/foundations/core/packages/*` (and the rest of the
workspace) are the publish source. They're currently set up for GitHub Packages auth (see `README.md`'s
"Authentication" section) with a version-bump script at `common/scripts/bump.js`. Moving some
or all of them to the public npm registry (or staying on GitHub Packages) is a decision the
user needs to make explicitly, and can be made per-package rather than all-or-nothing.

Every package version across `club` and its embedded/standalone `communication` was reset to
`1.0.0` as a one-time baseline (nothing had been published before, so there was no reason to
start below 1.0). Treat `1.0.0` as the pre-publish starting point, not as a version that has
already shipped - the first real `rush publish` still needs the user's go-ahead per the rule
below, and version bumps after that should follow normal semver from `1.0.0` onward.

Agent guidance:

- Never run `npm publish`, `rush publish`, or `node common/scripts/bump.js` in a way that
  actually ships a version unless the user explicitly asks to publish *that* package *now*.
  Publishing is effectively irreversible: npm refuses to let you republish a version number,
  and yanking a bad release doesn't undo installs that already happened.
- Before any publish-adjacent change, double check `package.json`'s `name`, `version`, and
  `private` fields, and confirm the target registry (npm vs. GitHub Packages) with the user
  if it isn't already obvious from `.npmrc`/existing config.

### Phase 5 - Deploy live on AWS

Goal: a production deployment of the club stack on AWS, funded by the user's AWS credits,
serving real traffic.

Agent guidance:

- Treat every resource-creation or config change against AWS with the same bar as a
  destructive git operation: confirm before acting, and match the scope of what was asked.
- This environment has AWS-focused subagents and skills available (e.g.
  `aws-dev-toolkit:well-architected-reviewer`, `aws-dev-toolkit:cost-optimizer`,
  `aws-dev-toolkit:container-sme`, `aws-dev-toolkit:serverless-sme`,
  `aws-dev-toolkit:networking-sme`) - use them to design and review the deployment
  architecture rather than guessing at an approach for a 30+ service distributed system.
  Given the service count and CockroachDB/Redpanda/MinIO dependencies described in
  `ARCHITECTURE_OVERVIEW.md`, expect this to be a container-orchestration decision (ECS or
  EKS) rather than a single-instance deploy - but that's a decision to make deliberately
  with the user, not to default into.
- All the dev-only secrets and default credentials called out in `ARCHITECTURE_OVERVIEW.md`
  ("Environment Variables Summary") must be replaced with real, per-environment secrets
  managed via AWS Secrets Manager or Parameter Store before anything is exposed publicly.
- Cost matters here specifically because it's credits, not an unlimited budget - flag
  expensive-by-default choices (e.g. always-on Elasticsearch/CockroachDB clusters sized for
  the full local dev service list) rather than carrying them into production unexamined.
