import { NextApiRequest, NextApiResponse } from 'next';

import { randomUUID } from 'crypto';
import { prisma } from '@tutormint/prisma';

import { jwtProvide } from '@tutormint/lib';
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

    const admin = await prisma.admin.findUnique({
      where: {
        username: body.username, // Assuming 'body' contains the incoming request's data
      },
    });

    if (admin && admin.password === body.password) {
      // Credentials match, create a new admin
      const token = jwtProvide(admin, '');
      return res.status(200).json({ token: token });
      // Handle the response or further operations
    } else {
      res.status(300).json({ err: 'Credentials are incorrect or admin not found' });
      // Credentials are incorrect or admin not found
      // Handle the case where credentials don't match
    }

    // const admin = await prisma.admin.create({
    //   data: {
    //     username: body.username,
    //     password: body.password,
    //   },
    // });
    // console.log('newAdmin', admin);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
