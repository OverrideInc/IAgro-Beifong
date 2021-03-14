# Beifong

[![<OverrideInc>](https://circleci.com/gh/OverrideInc/IAgro-Beifong.svg?style=shield&circle-token=b8925018796325809b7bfc97a01821992103b99a)](https://app.circleci.com/pipelines/github/OverrideInc/IAgro-Beifong)

Serverless REST-like API to store the data collected by the IOT module.

## Project Set-up

First, configure your environment variables:

```
$ cp .env.example .env
$ cp .env.example .env.development
```

Edit the `.env` and `.env.development` file with the right values. Make sure these files are in the root of the project. Both files should have the same content.


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
$ npm install
```

Run the migrations:

```
$ npm run knex
```

Run the serverless-offline:

```
$ npm run start
```

Or:

```
$ npm run dev
```

## Lint

To check the quality of your code, run:

```
$ npm run lint:js
```

If you want quick fixes to your errors, use:

```
$ npm run lint:js:fix
```

## Tests

Configure your test environment variables:

```
$ cp .env.example .env.test
```

**Ensure that you have the right DB connection values**. Then, run the migrations:

```
$ NODE_ENV=test npm run knex
```

Run the tests:

```
$ npm test
```

**NOTE:** If you have problems executing the bin files, you might have to run:

```
$ chmod u+x bin/startServices.sh
$ chmod u+x bin/stopServices.sh
```

**A Husky Hook is setted to run lint and test before committing changes, please run:**

```
$ npm run prepare
```

## CI

This application uses CircleCI to perform Continuous Integration.

[![<OverrideInc>](https://circleci.com/gh/OverrideInc/IAgro-Beifong.svg?style=svg&circle-token=b8925018796325809b7bfc97a01821992103b99a)](https://app.circleci.com/pipelines/github/OverrideInc/IAgro-Beifong)


# Deploying

Configure your production environment variables:

```
$ cp .env.example .env.production
```

Clear the .env file to prevent env vars overlapping:

```
$ > .env
```

Then, run the command:

```
$ npm run deploy
```

When the deploy is done, restore the .env file:

```
$ cp .env.development .env
```
