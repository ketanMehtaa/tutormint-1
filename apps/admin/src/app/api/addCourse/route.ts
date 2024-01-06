import { prisma } from '@tutormint/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!,
    },
  });
  const product = await res.json();

  return Response.json({ product });
}
export async function POST(req: Request) {
  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY!,
  //     },
  //     body: JSON.stringify({ time: new Date().toISOString() }),
  //   });

  //   const data = await res.json();

  //   return Response.json(data);
  const { formData, session } = await req.json();

  const admin = await prisma.admin.findUnique({
    where: {
      username: session.user.name, // Assuming 'body' contains the incoming request's data
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
