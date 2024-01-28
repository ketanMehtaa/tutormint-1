import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@tutormint/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

//Contact delete route
export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthenticated', { status: 401 });
  }

  if (!params.courseId) {
    return new NextResponse('contact ID is required', { status: 400 });
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

  try {
    // Enroll the user in the course
    const buyCourse = await prisma.courseEnrollment.create({
      data: {
        user: { connect: { id: user.id } },
        course: { connect: { id: params.courseId } },
      },
    });

    console.log(`Course ${params.courseId} purchased for user amit hardcoded.`);

    return NextResponse.json({ message: 'Contact purchased', buyCourse }, { status: 200 });
  } catch (error) {
    console.log('[COURSE_PURCHASED]', error);
    return new NextResponse('Initial error', { status: 500 });
  }
}
