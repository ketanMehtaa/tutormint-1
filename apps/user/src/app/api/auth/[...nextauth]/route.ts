import nextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@tutormint/prisma';

import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID_USER || '',
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET_USER || '',
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', value: 'amit' },
        password: { label: 'Password', type: 'password', value: 'amit' },
      },
      async authorize(credentials, req) {
        // await ensureDbConnected()
        if (!credentials) {
          return null;
        }
        const username = credentials.username;
        const password = credentials.password;
        // Add logic here to look up the user from the credentials supplied
        // const admin = await Admin.findOne({ username });
        const user = await prisma.user.findUnique({
          where: {
            username: username, // Assuming 'body' contains the incoming request's data
          },
        });

        if (!user) {
          const user = await prisma.user.create({
            data: {
              username: username,
              password: password,
            },
          });
          console.log('user data', user);
          return {
            id: user.id, // Replace 'id' with the actual ID field from your user object
            email: user.username, // Replace 'username' with the field containing the email
            name: user.username,
            image: '',
          };

          // const obj = { username: username, password: password };
          // const newAdmin = new Admin(obj);
          // let adminDb = await newAdmin.save();
          // console.log(adminDb);
          // return {
          //   id: adminDb._id,
          //   email: adminDb.username,
          // };
        } else {
          //TODO:: Make this safer, encrypt passwords
          // if (admin.password !== password) {
          //   return null;
          // }
          if (user && user.password !== password) {
            return null;
          }
          // User is authenticated
          // return {
          //   id: admin._id,
          //   email: admin.username,
          // };
          console.log('user ', user);
          return {
            id: user.id, // Replace 'id' with the actual ID field from your user object
            email: user.username, // Replace 'username' with the field containing the email
            name: user.username,
            image: '',
          };
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    // encryption: true,
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
