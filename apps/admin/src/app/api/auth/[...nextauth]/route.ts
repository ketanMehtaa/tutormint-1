import nextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@tutormint/prisma';

import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
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
        const admin = await prisma.admin.findUnique({
          where: {
            username: username, // Assuming 'body' contains the incoming request's data
          },
        });

        if (!admin) {
          const admin = await prisma.admin.create({
            data: {
              username: username,
              password: password,
            },
          });
          console.log('newAdmin', admin);
          return {
            id: admin.id, // Replace 'id' with the actual ID field from your admin object
            email: admin.username, // Replace 'username' with the field containing the email
            name: admin.username,
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
          if (admin && admin.password !== password) {
            return null;
          }
          // User is authenticated
          // return {
          //   id: admin._id,
          //   email: admin.username,
          // };
          console.log('admin ', admin);
          return {
            id: admin.id, // Replace 'id' with the actual ID field from your admin object
            email: admin.username, // Replace 'username' with the field containing the email
            name: admin.username,
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
