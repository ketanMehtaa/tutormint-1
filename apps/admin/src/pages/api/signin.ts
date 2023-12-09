import { NextApiRequest, NextApiResponse } from 'next';

import { randomUUID } from 'crypto';
import { prisma } from '@tutormint/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;

    if (method?.toUpperCase() !== 'POST') {
      return res.status(405).json({
        error: 'Method not allowed',
      });
    }
    const body = req.body;

    console.log('body hello', body);
    console.log('env', process.env.DATABASE_URL);

    const admin = await prisma.admin.create({
      data: {
        username: body.username,
        password: body.password,
      },
    });
    console.log('newAdmin', admin);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
