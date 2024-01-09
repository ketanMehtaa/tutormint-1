import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@tutormint/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

//Contact delete route
export async function DELETE(req: Request, { params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthenticated', { status: 401 });
  }

  if (!params.courseId) {
    return new NextResponse('contact ID is required', { status: 400 });
  }

  try {
    const deletedCourse = await prisma.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json({ message: 'Contact deleted', deletedCourse }, { status: 200 });
  } catch (error) {
    console.log('[COURSE_DELETE]', error);
    return new NextResponse('Initial error', { status: 500 });
  }
}
