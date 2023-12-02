import { pinoHttp } from 'pino-http';

export const pino = pinoHttp({
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url
    }),
    res: (res) => ({
      statusCode: res.statusCode
    }),
    err: (err) => ({
      type: err.type,
      message: err.message
    })
  }
});

export const logger = pino.logger;
