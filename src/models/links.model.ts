import { sql } from "@/utils/sql";
import slugify from "slugify";
import { object, string, number, type Output, parse } from "valibot";

const LinksSchema = object({
  id: number(),
  name: string(),
  link: string(),
  created_at: string(),
  updated_at: string(),
});

export type ILinks = Output<typeof LinksSchema>;

// biome-ignore lint/complexity/noStaticOnlyClass: Want models to be static
export class LinksModel {
  public static async getLinks(): Promise<ILinks[] | undefined> {
    const { rows } = await sql`SELECT * FROM links`;

    if (rows.length <= 0) {
      return undefined;
    }

    return rows.map((row) => parse(LinksSchema, row));
  }

  public static async addLink(name: string, link: string): Promise<void> {
    const slug = slugify(name);
    await sql`INSERT INTO links (name, link) VALUES (${slug}, ${link})`;
  }

  public static async deleteLink(id: number): Promise<void> {
    await sql`DELETE FROM links WHERE id = ${id}`;
  }

  public static async updateLink(
    id: number,
    name: string,
    link: string
  ): Promise<void> {
    const slug = slugify(name);
    await sql`UPDATE links SET name = ${slug}, link = ${link}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
  }

  public static async getByName(name: string): Promise<ILinks | undefined> {
    const { rows } = await sql`SELECT * FROM links WHERE name = ${name}`;

    if (rows.length <= 0) {
      return undefined;
    }

    return parse(LinksSchema, rows[0]);
  }
}
