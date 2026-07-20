/**
 * Auth configuration (NextAuth.js v5 / Auth.js)
 *
 * To enable Google OAuth:
 * 1. Install: npm install next-auth@beta @auth/core
 * 2. Set AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET in .env
 * 3. Uncomment the auth config below
 * 4. Create app/api/auth/[...nextauth]/route.ts
 */

/*
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
});
*/
