import { defineMiddleware } from "astro:middleware";
import { cookieName, verifyJwt } from "@/lib/jwt";
import { jres } from "@/utils/response.util";
import HttpStatusCode from "@/lib/http.status";

const protectedPaths = ["/dashboard", "/api/link/*"];

export const onRequest = defineMiddleware((ctx, next) => {
  const isProtected = protectedPaths.some((e) => ctx.url.pathname.match(e));

  if (isProtected) {
    const cookie = ctx.cookies.get(cookieName)?.value.trim();

    if (cookie) {
      const verified = verifyJwt(cookie);

      if (verified) {
        return next();
      }

      return jres(null, HttpStatusCode.TEMPORARY_REDIRECT, {
        Location: "/",
      });
    }

    return jres(null, HttpStatusCode.TEMPORARY_REDIRECT, {
      Location: "/",
    });
  }

  return next();
});
