import { createClient } from "@libsql/client";

const { TURSO_URL, TURSO_TOKEN } = import.meta.env;

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

await client.execute({
  sql: `CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    link TEXT NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  args: [],
});

export default client;
