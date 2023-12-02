import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import 'express-async-errors';
import * as OpenApiValidator from 'express-openapi-validator';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import session from 'express-session';
import helmet from 'helmet';
import path from 'path';
import * as users from './routes/users';
import { parseJwtToJwtPayload } from './services/jwt';
import { logger, pino } from './services/logger';

const app = express();
app.use(pino);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/web', express.static(path.join(__dirname, 'views')));
app.use(cookieParser(process.env.COOKIE_SECRET || ''));
app.use(helmet());
app.use(
  session({
    secret: process.env.COOKIE_SECRET || 'secret',
    name: process.env.COOKIE_NAME,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30,
      secure: true,
      httpOnly: true,
      domain: process.env.COOKIE_DOMAIN
    }
  })
);

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, '../', 'schema', 'v1.yaml'),
    validateRequests: true,
    validateResponses: true,
    validateSecurity: {
      handlers: {
        Bearer: (req) => {
          try {
            const jwt = req.headers['authorization']?.split(' ')[1];
            if (jwt === undefined) throw new Error('Can not authenticate.');
            const payload = parseJwtToJwtPayload(jwt);
            if (payload === null) throw new Error('Can not authenticate.');
            req.res!.locals.user = payload;
            return Promise.resolve(true);
          } catch (err) {
            return Promise.reject({ status: 401, message: 'Can not authenticate.' });
          }
        }
      }
    }
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  return res.status(err.status).json({ error: err.name });
});

app.get('/users', users.GET);
app.post('/users', users.POST);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info('Server started on port: ' + port);
});
