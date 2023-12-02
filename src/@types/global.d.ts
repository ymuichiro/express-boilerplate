import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      COOKIE_SECRET: string | undefined;
      COOKIE_DOMAIN: string | undefined;
      COOKIE_NAME: string | undefined;
    }
  }
}

declare global {
  namespace Express {
    interface Request {}
    interface Response {}
    interface Locals {
      user?: JwtPayload;
    }
    interface Application {}
  }
}

declare module 'express-async-errors';

export {};
