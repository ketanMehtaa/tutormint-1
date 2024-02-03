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
        email: { label: 'email', type: 'text', value: 'meetketanmehta@gmail.com' },
        password: { label: 'Password', type: 'password', value: 'ketan' },
      },
      async authorize(credentials, req) {
        // await ensureDbConnected()
        if (!credentials) {
          return null;
        }
        const email = credentials.email;
        const password = credentials.password;
        // Add logic here to look up the user from the credentials supplied
        // const admin = await Admin.findOne({ email });
        const user = await prisma.user.findUnique({
          where: {
            email: email, // Assuming 'body' contains the incoming request's data
          },
        });

        if (!user) {
          const user = await prisma.user.create({
            data: {
              email: email,
              password: password,
            },
          });
          console.log('user data', user);
          return {
            id: user.id,
            email: user.email,
            name: user?.name,
            image: user?.image,
          };
        } else {
          //TODO:: Make this safer, encrypt passwords
          // if (admin.password !== password) {
          //   return null;
          // }
          if (user && user.password !== password) {
            return null;
          }
          // User password is correct continue
          console.log('user ', user);
          return {
            // id: user.id  ,
            email: user.email,
            name: user?.name,
            image: user?.image,
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('callback user signin', { user, account, profile, email, credentials });
      if (!user.email) {
        return false;
      }
      if (account?.provider === 'google') {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email },
          select: { name: true },
        });
        // if the user already exists via email,
        // update the user with their name and image from Google
        if (userExists && !userExists.name) {
          await prisma.user.update({
            where: { email: user?.email },
            data: {
              name: profile?.name,
              // @ts-ignore - this is a bug in the types, `picture` is a valid on the `Profile` type
              image: profile?.picture,
            },
          });
        } else if (!userExists) {
          await prisma.user.create({
            data: {
              image: profile?.picture,
              name: profile?.name,
              email: user.email,
            },
          });
        }
        return true;
      } else if (account?.provider === 'credentials') {
        return true;
      } else return false;
      // check error above if facing problem in sign in
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, name: true },
      });
      session.user.id = user.id;
      session.user.name = user?.name;

      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
