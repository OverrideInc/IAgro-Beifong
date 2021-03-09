# IAgro-Beifong
API to store the data collected by the IOT module


## Project Set-up

First, configure your environment variables:

```
$ cp .env.sample .env
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
