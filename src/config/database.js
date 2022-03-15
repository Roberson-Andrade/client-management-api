module.exports = {
  development: {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'client-management-app',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};