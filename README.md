# GraphQL API

[![Build Status](https://travis-ci.com/dev-saas/api.svg?branch=master)](https://travis-ci.com/dev-saas/api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=coverage)](https://sonarcloud.io/dashboard?id=dev-saas_api)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=alert_status)](https://sonarcloud.io/dashboard?id=dev-saas_api)
[![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=dev-saas_api)
[![Reliability](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=dev-saas_api)
[![Security](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=security_rating)](https://sonarcloud.io/dashboard?id=dev-saas_api)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=ncloc)](https://sonarcloud.io/dashboard?id=dev-saas_api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=code_smells)](https://sonarcloud.io/dashboard?id=dev-saas_api)
[![Duplicated Lines](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=dev-saas_api)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=bugs)](https://sonarcloud.io/dashboard?id=dev-saas_api)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=sqale_index)](https://sonarcloud.io/dashboard?id=dev-saas_api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=dev-saas_api&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=dev-saas_api)

## Folder structure

```bash
.
├── src
│   ├── controllers
│   ├── graphql
│   │   ├── _directives
│   │   ├── _scalars
│   │   ├── comment
│   │   ├── notification
│   │   ├── post
│   │   └── user
│   ├── middleware
│   ├── models
│   │   └── plugins
│   └── services
└── test
    ├── comment
    ├── post
    └── user
```

- **.** - configuration files
- **src** - apollo, express and graphql configuration
  - **controllers** - called by the resolvers, need *-controller* to be injected automatically to the context
  - **graphql** - base schema
    - **_directives** directive resolvers
    - **_scalars** scalar resolvers
    - **comment** comment schema and resolvers
    - **notification** notification schema and resolvers
    - **post** post schema and resolvers
    - **user** user schema and resolvers
  - **middlewares** - express and apollo middlewares
  - **models** - mongoose models
    - **plugins** - mongoose plugins
  - **services** - called by the controllers, need *-service* to be injected to the controllers constructor
- **test** - functional tests

## Development

### Extending the API

This project is using [schemaglue](https://github.com/nicolasdao/schemaglue) and [schema-s2s](https://github.com/nicolasdao/graphql-s2s), that joins all .schema files and resolvers from **graphql** folder and enhances the graphql schema.

- **graphql**
  - **schema** - change the schema, create folders if necessary
  - **resolver** - edit or create the resolvers - resolvers are exported with `exports.resolver = { }`
- **controller** - edit or create the controllers
- **service** - edit or create the services

### Run

Rename nodemon.json.example to nodemon.json

Set the enviroment variables in nodemon.json

Install dependencies

```sh
npm install
```

Run

```sh
npm run dev
```
