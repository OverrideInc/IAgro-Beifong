const defaultConfig = {
  client: 'postgresql',
  connection: {
    host : process.env.DB_HOST,
    port: process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  },
  pool: {
    min: 10,
    max: 30,
  },
  migrations: {
    directory: 'src/db/migrations',
    tableName: 'knex_migrations',
  },
};

module.exports = {
  development: defaultConfig,
  staging: defaultConfig,
  production: defaultConfig,
  test: {
    ...defaultConfig,
    connection: {
      ...defaultConfig.connection,
      database: 'iagro-test',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
