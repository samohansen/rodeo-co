import NextAuth, { Awaitable, RequestInternal, User } from 'next-auth';
import { NextApiHandler } from 'next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'src/prisma';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

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

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;