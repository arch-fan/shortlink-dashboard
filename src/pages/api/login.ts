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

		const secureRule = import.meta.env.DEV ? "" : "Secure;";
		const cookieDuration = 60 * 60 * 24 * 30 * 12;

		return jres(null, 302, {
			"Set-Cookie": `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${cookieDuration}; ${secureRule}`,
			Location: "/dashboard",
		});
	}

	return jres({ error: "Invalid credentials" }, 401);
};
