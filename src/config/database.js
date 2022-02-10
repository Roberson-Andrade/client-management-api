module.exports = {
  host: process.env.DB_HOSTNAME,
  dialect: 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'client-management-app',
  define: {
    timestamps: true,
    underscored: true,
  },
};