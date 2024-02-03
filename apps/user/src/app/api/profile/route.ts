import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@tutormint/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

//Contact delete route
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthenticated', { status: 401 });
  }

  try {
    // const value = await req.json();
    const { formData } = await req.json();

    // Enroll the user in the course
    const saveProfile = await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        name: formData.name,
        email: formData.email,
      },
    });

    return NextResponse.json({ message: 'profile saved', save: saveProfile }, { status: 200 });
  } catch (error) {
    console.log('[COURSE_PURCHASED]', error);
    return new NextResponse('Initial error', { status: 500 });
  }
}
