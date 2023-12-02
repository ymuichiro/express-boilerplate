import { type Request, type Response } from 'express';
import type * as t from '../@types/schema';
import { logger } from '../services/logger';
import { prisma } from '../services/prisma';

export async function GET(req: Request, res: Response<t.UsersGet200Response>) {
  res.status(200).type('application/json').json({ id: 'id', name: 'sample' });
}

export async function POST(
  req: Request<null, null, t.UserApiPostUserRequest['user']>,
  res: Response<t.UsersPost200Response>
) {
  try {
    const user = req.body;
    logger.info(res.locals.user);
    await prisma.user.create({
      data: {
        email: `${user.name}@example.org`,
        name: user.name
      }
    });

    res.status(200).type('application/json').json({ id: 'id', name: user.name });
  } catch (err) {
    logger.error(err);
    res.status(500).type('application/json').end();
  }
}
