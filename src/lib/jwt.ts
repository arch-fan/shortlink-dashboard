import jwt from "jsonwebtoken";

const { JWT_SECRET } = import.meta.env;

export const cookieName = "auth-cookie";

interface JwtPayload extends jwt.JwtPayload {
  username: string;
}

export const verifyJwt = (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return payload;
  } catch (_) {
    return;
  }
};

export const createToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1y",
  });
};
