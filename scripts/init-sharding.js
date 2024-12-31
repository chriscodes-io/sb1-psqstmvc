db.adminCommand({ enableSharding: "weather_db" });

// Shard the weather readings collection
db.adminCommand({
  shardCollection: "weather_db.weatherreadings",
  key: { deviceName: "hashed" }
});

// Create indexes
db.weatherreadings.createIndex({ temperature: 1 });
db.weatherreadings.createIndex({ humidity: 1, precipitation: 1 });
db.weatherreadings.createIndex({ time: 1 });

// TTL index for users
db.users.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 2592000, partialFilterExpression: { role: "user" } }
);