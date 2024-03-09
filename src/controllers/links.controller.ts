import { LinksModel } from "@/models/links.model";
import type { APIRoute } from "astro";
import { string, object, safeParse, number, type Output } from "valibot";
import { jres } from "@/utils/response.util";
import type { ResponseError } from "./types.d";
import { HttpStatusCode } from "@/lib/http.status";

export const GET: APIRoute = async () => {
  const links = await LinksModel.getLinks();

  return jres(links);
};

const PostSchema = object({
  name: string(),
  link: string(),
});

export type PostBody = Output<typeof PostSchema>;

export const POST: APIRoute = async (ctx) => {
  const body = await ctx.request.json();
  const parsedBody = safeParse(PostSchema, body);

  if (parsedBody.success) {
    const { name, link } = parsedBody.output;

    if (!URL.canParse(link)) {
      return jres<ResponseError>(
        {
          error: "Invalid link. Link must be a valid URL.",
        },
        HttpStatusCode.BAD_REQUEST
      );
    }

    try {
      await LinksModel.addLink(name, link);
      return jres(null, HttpStatusCode.CREATED);
    } catch (_) {
      return jres<ResponseError>(
        {
          error: "You cannot repeat the name or link.",
        },
        HttpStatusCode.BAD_REQUEST
      );
    }
  }

  return jres<ResponseError>(
    {
      error: "Invalid name or link. Name and link cannot be empty.",
    },
    HttpStatusCode.BAD_REQUEST
  );
};

export type DeleteBody = Output<typeof DeleteSchema>;

const DeleteSchema = object({
  id: number(),
});

export const DELETE: APIRoute = async (ctx) => {
  const body = await ctx.request.json();
  const parsedBody = safeParse(DeleteSchema, body);

  if (parsedBody.success) {
    const { id } = parsedBody.output;
    try {
      await LinksModel.deleteLink(id);
    } catch (_) {
      return jres<ResponseError>(
        {
          error: "Something went wrong. Try again later.",
        },
        HttpStatusCode.BAD_REQUEST
      );
    }
    return new Response(null, { status: 204 });
  }

  return new Response(null, { status: 400 });
};

const PatchSchema = object({
  id: number(),
  name: string(),
  link: string(),
});

export const PATCH: APIRoute = async (ctx) => {
  const body = await ctx.request.json();
  const parsedBody = safeParse(PatchSchema, body);

  if (parsedBody.success) {
    const { id, name, link } = parsedBody.output;
    try {
      await LinksModel.updateLink(id, name, link);
    } catch (_) {
      return jres<ResponseError>(
        {
          error: "Something went wrong. Try again later.",
        },
        HttpStatusCode.BAD_REQUEST
      );
    }
  }

  return jres(null, HttpStatusCode.NO_CONTENT);
};
