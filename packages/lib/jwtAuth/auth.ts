import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;
export async function jwtProvide(req: any, res: any) {
  console.log('jwtProvider req', req);
  const token = await getToken({ req });
  console.log('JSON Web Token', token);
  return token;
}
export async function jwtVerify(req: any, res: any) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  const token = await getToken({ req, secret: secret });
  console.log('JSON Web Token', token);
  res.end();
}
