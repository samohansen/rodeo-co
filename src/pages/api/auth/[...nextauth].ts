import NextAuth from 'next-auth';
import { NextApiHandler } from 'next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth'

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: 'jwt', // force jwt instead of Prisma adapter default (db sessions)
    // this also should resolve the final roadblock to actually using credential sessions, but we've been down that road unsuccessfully maybe too many times haha
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.type = user.type;
      }
      return token;
    },
    async session({session, token}) {
      // to include other user info with session, update 
        // - types/next-auth.d.ts, and
        // - jwt callback
      session.user.type = token.type;
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/account',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  adapter: PrismaAdapter(prisma),
}

const options = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('authorize method called');
        if (!prisma) { throw new Error('Prisma connection not established'); }

        // check user exists
        const user = await prisma.user.findUnique({
          where: { email: credentials.email, },
        });
        
        if(!user) {
          throw new Error('User not found');
        }

        // compare password
        const checkPassword = await compare(credentials.password, user.password);
        if (checkPassword) {
          console.log('password correct (matches DB hash)');
        }

        // incorrect password
        if(!checkPassword || user.email !== credentials.email) {
          throw new Error('Username & password do not match');
        }

        return user;
      }}),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  pages: {
    signIn: '../../login',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
};

export default (req, res): NextApiHandler => NextAuth(req, res, authOptions);
