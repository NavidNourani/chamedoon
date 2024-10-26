import { prisma } from "@/helpers/db";
import { login } from "@/serverActions/user/login";
import { User } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import credentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
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
          const newUser = await prisma.user.create({
            data: {
              email: profile?.email!,
              name: (profile?.name as any)?.givenName,
              family: (profile?.name as any)?.familyName,
              username: (profile?.email as any)!.split("@")[0],
            },
          });
          // Update the user object with the newly created user
          user.id = newUser.id;
          user.email = newUser.email;
          user.name = newUser.name;
        } else {
          // Update the user object with the existing user's information
          user.id = existingUser.id;
          user.email = existingUser.email;
          user.name = existingUser.name;
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

export default NextAuth(authOptions);
