// needed to expand on the session/user definition to access user Role easily
import NextAuth from "next-auth"

declare module "next-auth" {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session extends DefaultSession {
    user: {
      type: iUser['type'];
      email: iUser['email'];
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    type: 'new' | 'admin' | 'participant';
    email: string;
  }
}