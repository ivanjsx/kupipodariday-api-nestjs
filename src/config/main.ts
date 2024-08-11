export const mainConfig = () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME || 'kupipodariday',
    schema: process.env.DATABASE_SCHEMA || 'kupipodariday',
    username: process.env.DATABASE_USERNAME || 'student',
    password: process.env.DATABASE_PASSWORD || 'student',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'yes-i-do-masturbate-to-my-own-code',
    ttl: process.env.JWT_TTL || '10h',
  },
});
