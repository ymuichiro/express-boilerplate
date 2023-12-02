import { JwtPayload, decode } from 'jsonwebtoken';

export function parseJwtToJwtPayload(jwt: string): JwtPayload | null {
  const decoded = decode(jwt, { complete: true });

  if (decoded === null || typeof decoded.payload === 'string') {
    return null;
  }

  return decoded.payload;
}
