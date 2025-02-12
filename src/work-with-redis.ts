// Write a script that:
// 1. Connects to Redis.
// 2. Saves the keys with their values.
// 3. Reads and outputs values for a given key.

// Use redis library
const redis = require("redis");

async function manageRedis(): Promise<void> {
  const client = redis.createClient();

  await new Promise<void>((resolve, reject) => {
    // Устанавливаем ключ "key"
    client.set("key", "value", function (err: Error | null, reply: string) {
      // Получаем значение для ключа "key"
      client.get("key", function (err: Error | null, result: string | null) {
        // Выводим результат в консоль (если нужно для отладки)
        console.log('Значение по ключу "key":', result);

        // Закрываем соединение с Redis
        client.quit();

        // Завершаем Promise, так как операции выполнены
        resolve();
      });
    });
  });
}

module.exports = { manageRedis };
