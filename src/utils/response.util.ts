import { HttpStatusCode } from "@/lib/http.status";

type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JSON
  | JSONArray;

interface JSONArray extends Array<JSONValue> {}

interface JSON extends Record<string, JSONValue> {}

export function jres<T = JSON | null>(
  payload: T,
  status: HttpStatusCode = HttpStatusCode.OK,
  headers: Record<string, string> = { "Content-Type": "application/json" }
) {
  const _payload = payload ? JSON.stringify(payload) : null;

  return new Response(_payload, { status, headers });
}
