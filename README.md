# GraphQL API

## Folder structure

```bash
.
└── src
    ├── controllers
    ├── graphql
    │   ├── _directives
    │   ├── _scalars
    │   ├── comment
    │   ├── notification
    │   ├── post
    │   └── user
    ├── middleware
    ├── models
    │   └── plugins
    └── services
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
