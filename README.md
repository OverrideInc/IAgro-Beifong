# Beifong

API to store the data collected by the IOT module


## Project Set-up

First, configure your environment variables:

```
$ cp .env.example .env
```

Edit the `.env` file with the right values. Make sure this file is in the root of the project.


Ensure that you have the right DB connection values:

```
DB_HOST=db-host
DB_PORT=5432
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=iagro
```

**CAUTION:** You have to create the databases and users before running the project. Create also the `iagro-test` database to run the tests later.

Install the dependencies:

```
npm install
```

Run the migrations:

```
env $(cat .env) knex migrate:latest
```

Or:

```
npm run knex
```

Run the server:

```
npm run start
```

Or using nodemon:

```
npm run dev
```

## Lint

To check the quality of your code, run:

```
npm run lint:js
```

If you want quick fixes to your errors, use:

```
npm run lint:js:fix
```

## Tests

Run the migrations:

```
NODE_ENV=test npm run knex
```

Run the tests:

```
npm run test
```

**A Husky Hook is setted to run lint and test before committing changes, please run:**

```
npm run prepare
```

## CI

This application uses CircleCI to perform Continuous Integration.

[![<OverrideInc>](https://circleci.com/gh/OverrideInc/IAgro-Beifong.svg?style=svg&circle-token=b8925018796325809b7bfc97a01821992103b99a)](https://app.circleci.com/pipelines/github/OverrideInc/IAgro-Beifong)
