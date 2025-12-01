/**
 * Конфігурація бази даних для продакшен-середовища (Render, Railway).
 * Примусово використовує PostgreSQL та змінні середовища, встановлені на хостингу.
 */

module.exports = ({ env }) => ({
  // ✅ Примусово встановлюємо PostgreSQL для продакшену
  connection: {
    client: "postgres",
    connection: {
      // Пріоритет: використання цілого рядка підключення, якщо його надає хостинг (DATABASE_URL)
      connectionString: env("DATABASE_URL"),

      // Або використання окремих полів (якщо DATABASE_URL не встановлено)
      host: env("DATABASE_HOST"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USERNAME"),
      password: env("DATABASE_PASSWORD"),

      // У продакшені SSL зазвичай потрібен. Render і Supabase цього вимагають.
      ssl: env.bool("DATABASE_SSL", true) && {
        // rejectUnauthorized: false часто потрібен, якщо хостинг використовує самопідписані сертифікати
        rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false),
      },
      schema: env("DATABASE_SCHEMA", "public"), // Зазвичай public
    },
    // Налаштування пулу з'єднань
    pool: {
      min: env.int("DATABASE_POOL_MIN", 2),
      max: env.int("DATABASE_POOL_MAX", 10),
    },
    acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
  },
});
