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

    // const { username } = req.query;
    // console.log('username', session);

    // const session = await req.json();

    // console.log('session-0---', session);
    // if (!session || !session.name) {
    //   return {
    //     status: 400,
    //     body: 'Invalid session or missing user name',
    //   };
    // }
    const admin = await prisma.admin.findUnique({
      where: {
        // username: session.user.name, // Assuming 'body' contains the incoming request's data
        email: session.user.email,
      },
    });
    console.log('admin', admin);
    if (!admin || !admin.id) {
      return Response.json({ err: 'error in finding admin all courses' });
    }
    const userCourses = await prisma.course.findMany({
      where: { creatorId: admin.id }, // Assuming 'session.name' holds the username
    });

    return Response.json({
      status: 200,
      data: userCourses,
    });
  } catch (error: any) {
    return Response.json({
      status: 500,
      body: `Error: ${error.message}`,
    });
  }
}

export async function POST(req: Request) {
  const { formData } = await req.json();

  const session = await getServerSession(authOptions);

  const admin = await prisma.admin.findUnique({
    where: {
      email: session.user.email, // Assuming 'body' contains the incoming request's data
    },
  });
  console.log('admin', admin);
  if (!admin || !admin.id) {
    return Response.json({ err: 'error in finding admin' });
  }
  console.log('req bodddddddddddddddd', formData, session);
  const newCourse = await prisma.course.create({
    data: {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      imageLink: formData.imageLink,
      published: Boolean(formData.published),
      creatorId: admin.id,
    },
  });
  console.log('Created new course:', newCourse);
  return Response.json({ newCourse });
}
