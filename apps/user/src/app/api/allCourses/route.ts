import { prisma } from '@tutormint/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthenticated session not found in allcourses', { status: 401 });
    }

    const courses = await prisma.course.findMany();

    return Response.json({
      status: 200,
      data: courses,
    });
  } catch (error: any) {
    return Response.json({
      status: 500,
      body: `Error: ${error.message}`,
    });
  }
}

export async function POST(req: Request) {
  // const { formData, session } = await req.json();
  // const user = await prisma.user.findUnique({
  //   where: {
  //     username: session.user.name, // Assuming 'body' contains the incoming request's data
  //   },
  // });
  // console.log('user', user);
  // if (!user || !user.id) {
  //   return Response.json({ err: 'error in finding user' });
  // }
  // console.log('req bodddddddddddddddd', formData, session);
  // const newCourse = await prisma.course.create({
  //   data: {
  //     title: formData.title,
  //     description: formData.description,
  //     price: parseFloat(formData.price),
  //     imageLink: formData.imageLink,
  //     published: Boolean(formData.published),
  //     creatorId: user.id,
  //   },
  // });
  // console.log('Created new course:', newCourse);
  // return Response.json({ newCourse });
}
