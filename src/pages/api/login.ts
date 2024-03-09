import type { APIRoute } from "astro";
import { createToken, cookieName } from "@/lib/jwt";
import { jres } from "@/utils/response.util";

export const POST: APIRoute = async (ctx) => {
  const { username, password } = await ctx.request.json();

  if (
    username === import.meta.env.USERNAME &&
    password === import.meta.env.PASSWORD
  ) {
    const token = createToken({ username });

    return jres(null, 302, {
      "Set-Cookie": `${cookieName}=${token}; Path=/; HttpOnly; ${
        import.meta.env.DEV ? "" : "Secure;"
      } SameSite=Strict`,
      Location: "/dashboard",
    });
  }

  return jres({ error: "Invalid credentials" }, 401);
};
