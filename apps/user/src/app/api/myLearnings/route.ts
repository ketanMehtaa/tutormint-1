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

    const user = await prisma.user.findUnique({
      where: {
        // username: session.user.name, // Assuming 'body' contains the incoming request's data
        username: 'amit',
      },
    });
    console.log('user', user);
    if (!user || !user.id) {
      return Response.json({ err: 'error in finding user all courses' });
    }

    const enrolledCourses = await prisma.courseEnrollment.findMany({
      where: { userId: user.id },
      include: {
        course: true,
      },
    });

    // const userCourses = await prisma.course.findMany({
    //   where: { creatorId: user.id }, // Assuming 'session.name' holds the username
    // });

    return Response.json({
      status: 200,
      data: enrolledCourses.map((enrollment) => enrollment.course),
    });
  } catch (error: any) {
    return Response.json({
      status: 500,
      body: `Error: ${error.message}`,
    });
  }
}

export async function POST(req: Request) {}
