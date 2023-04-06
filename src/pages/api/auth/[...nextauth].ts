import NextAuth from 'next-auth';
import { NextApiHandler } from 'next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'src/prisma';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: 'jwt', // force jwt instead of Prisma adapter default (db sessions) -- You're a genius Grace!
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
  // NOTE: If a user has already logged in with a provider and tries another provider, we will get OAuthAccountNotLinked error
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
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!prisma) { throw new Error('Prisma connection not established'); }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email, },
        });
        
        if(!user) {
          throw new Error('User not found');
        }

        const checkPassword = await compare(credentials.password, user.password);
        if(!checkPassword || user.email !== credentials.email) {
          throw new Error('Username & password do not match');
        }
        
        return user;
      }
    }),
    // CredentialsProvider({
    //   id: 'direct_jwt',
    //   credentials: {
    //     user: {label: "user", type: "object"},
    //     token: {label: "token", type: "object"}
    //   },
    //   async authorize(credentials, req) {
    //   // async authorize(credentials: DirectJwtAuthParams): Promise<WithAdditionalParams<User>> => {
    //     const { user, token } = credentials;

    //     return {
    //       token: token,
    //       user: user,
    //     }
    //   }
    // })
  ],
  adapter: PrismaAdapter(prisma),
};

export default (req, res): NextApiHandler => NextAuth(req, res, authOptions);
