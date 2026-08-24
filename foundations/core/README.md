# club Core

[![GitHub License](https://img.shields.io/github/license/opensrcs/club.core?style=for-the-badge)](LICENSE)

⭐️ Your star shines on us. Star us on GitHub!

## About

club Core is a collection of core packages extracted from the [OpenSrcs Club](https://github.com/opensrcs/club). This repository contains fundamental building blocks and libraries that power the club ecosystem, including core data models, client libraries, text processing engines, and platform utilities.

These packages are designed to be reusable, modular, and framework-agnostic, making them suitable for building custom applications on top of the OpenSrcs Club or integrating club functionality into existing projects.

## Packages

This repository includes the following core packages:

### Core Packages

- **[@opensrcs/core](packages/core)** - Core data models, types, and fundamental platform abstractions
- **[@opensrcs/club](packages/platform)** - Platform runtime, plugin system, and dependency injection
- **[@opensrcs/model](packages/model)** - Data model definitions and schema management

### Client Libraries

- **[@opensrcs/client](packages/client)** - Client-side data access and synchronization layer
- **[@opensrcs/client-resources](packages/client-resources)** - Shared client resources and utilities
- **[@opensrcs/api-client](packages/api-client)** - API client for programmatic access to OpenSrcs Club (WebSocket and REST)
- **[@opensrcs/account-client](packages/account-client)** - Account management client
- **[@opensrcs/collaborator-client](packages/collaborator-client)** - Real-time collaboration client
- **[@opensrcs/clublake-client](packages/clublake-client)** - ClubLake data warehouse client
- **[@opensrcs/analytics](packages/analytics)** - Analytics and tracking
- **[@opensrcs/analytics-service](packages/analytics-service)** - Analytics service implementation

### Text Processing

- **[@opensrcs/text](packages/text)** - High-level text processing utilities
- **[@opensrcs/text-core](packages/text-core)** - Core text processing engine
- **[@opensrcs/text-html](packages/text-html)** - HTML text rendering and parsing
- **[@opensrcs/text-markdown](packages/text-markdown)** - Markdown support
- **[@opensrcs/text-ydoc](packages/text-ydoc)** - Yjs document integration for collaborative editing

### Utilities

- **[@opensrcs/query](packages/query)** - Query language and execution engine
- **[@opensrcs/storage](packages/storage)** - Storage abstractions and implementations
- **[@opensrcs/rank](packages/rank)** - Ranking and ordering utilities
- **[@opensrcs/retry](packages/retry)** - Retry logic and resilience patterns
- **[@opensrcs/rpc](packages/rpc)** - RPC communication layer
- **[@opensrcs/token](packages/token)** - Token management and authentication utilities

## Pre-requisites

Before proceeding, ensure that your system meets the following requirements:

- [Node.js](https://nodejs.org/en/download/) (v20.11.0 or higher is required)
- [Rush](https://rushjs.io/) - Microsoft's scalable monorepo manager

## Installation

You need Microsoft's [rush](https://rushjs.io/) to install the application.

1. Install Rush globally using the command:

```bash
npm install -g @microsoft/rush
```

1. Navigate to the repository root and run the following commands:

```bash
rush install
rush build
```

## Build

To build all packages:

```bash
rush build
```

To rebuild (ignoring cache):

```bash
rush rebuild
```

## Build & Watch

For development purposes, `rush build:watch` action could be used:

```bash
rush build:watch
```

It includes build and validate phases in watch mode.

## Update project structure

If the project's structure is updated, it may be necessary to relink and rebuild the projects:

```bash
rush update
rush build
```

## Troubleshooting

If a build fails, but the code is correct, try to delete the [build cache](https://rushjs.io/pages/maintainer/build_cache/) and retry:

```bash
rm -rf common/temp/build-cache
rush rebuild
```

## Tests

To execute all tests:

```bash
rush test
```

For individual test execution inside a package directory:

```bash
rushx test
```

## Package Publishing

To bump a package version:

```bash
node ./common/scripts/bump.js -p projectName
```

## API Client Usage

If you want to interact with club programmatically, check out the [API Client](packages/api-client/README.md) documentation. The API client provides a typed interface for all club operations and can be used to build integrations and custom applications.

You can find API usage examples in the [club examples](https://github.com/opensrcs/club-examples) repository.

## Related Projects

- **[OpenSrcs Club](https://github.com/opensrcs/club)** - The main OpenSrcs Club repository
- **[club Self-Host](https://github.com/opensrcs/club-selfhost)** - Self-hosting solution for club
- **[club Examples](https://github.com/opensrcs/club-examples)** - API usage examples

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Licensed under the [EPL-2.0](LICENSE) license.

## Additional Links

- [club Website](https://club.opensrcs.org/)
- [Documentation](https://docs.opensrcs.org/)
- [Community](https://github.com/opensrcs/club/discussions)

---

© 2025 [OpenSrcs Inc](https://club.opensrcs.org/).
