module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/src/migrations/*.js"],
  cli: {
    "migrationsDir": "src/migrations"
  },
  seeds: ['dist/src/seeds/*.js']
};