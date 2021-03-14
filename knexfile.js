const defaultConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 1,
    max: 1,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false,
    afterCreate: async (conn, done) => {
      await conn.query('SET timezone="UTC";');
      done(null, conn);
    },
  },
  migrations: {
    directory: `${__dirname}/src/db/migrations`,
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
