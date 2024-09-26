import { login } from "@/serverActions/user/login";
import { User } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import credentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/helpers/db";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/signup",
    error: "/error",
  },
  providers: [
    credentialProvider({
      authorize: async (credentials) => {
        const user = await login({
          username: credentials!?.username,
          password: credentials!?.password,
        });
        if (user) {
          return user as any;
        }
        return null;
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your name" },
        password: { label: "Password", type: "password" },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile?.email },
        });

        if (!existingUser) {
          // Create a new user if they don't exist
          await prisma.user.create({
            data: {
              email: profile?.email!,
              name: (profile?.name as any)?.givenName,
              family: (profile?.name as any)?.familyName,
              // You might want to generate a random username or use the email
              username: (profile?.email as any)!.split("@")[0],
            },
          });
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.family = (user as User).family;
        token.id = (user as User).id;
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
