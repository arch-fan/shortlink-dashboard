import pool from "@/db/pool";

export async function sql(
  statement: TemplateStringsArray,
  ...args: Array<string | number>
) {
  const sql = statement.join("?");

  return await pool.execute({ sql, args });
}
