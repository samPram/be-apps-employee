## Description

Be apps employee for management employee data using framework [Nest](https://github.com/nestjs/nest).

## Feature

- Create, Read, Update and Delete Employee
- Import employee from CSV file
- Export employee to PDF and CSV

## Pre-required

- Setup Cloudinary account

With Docker

- Docker

or

Without Docker

- Node.js
- Postgres

## Installation

```bash
$ nvm use
$ npm install
```

## Running the app

With Docker

```bash
$ docker compose up -d
```

or

Without Docker

```bash
# development
$ export NODE_ENV=development
$ npm run start

# watch mode
$ export NODE_ENV=development
$ npm run start:dev

# production mode
$ export NODE_ENV=production
$ npm run start:prod
```

## Test

```bash
# unit tests
$ export NODE_ENV=test
$ npm run test

# e2e tests
$ export NODE_ENV=test
$ npm run test:e2e

# test coverage
$ export NODE_ENV=test
$ npm run test:cov
```

## Migration Database

```bash
# generate migration
$ npm run migration:generate --name=nameMigration

# create migration
$ npm run migraiton:create --name=nameMigration

# running migration
$ npm run migration:run

# show migration
$ npm run migration:show

```
