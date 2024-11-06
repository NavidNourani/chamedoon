import { prisma } from "@/helpers/db";
import { login } from "@/serverActions/user/login";
import { User } from "@prisma/client";
import { AuthOptions } from "next-auth";
import credentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/signup",
    error: "/error",
  },
  providers: [
    credentialProvider({
      authorize: async (credentials) => {
        const countryCode = credentials!?.countryCode;
        const phone = credentials!?.phone;

        const user = await login({
          countryCode,
          phone,
          password: credentials!?.password,
        });

        if (user) {
          return user as any;
        }
        return null;
      },
      credentials: {
        countryCode: { label: "Country Code", type: "text" },
        phone: { label: "Phone", type: "text" },
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
          const newUser = await prisma.user.create({
            data: {
              email: profile?.email!,
              name: (profile?.name as any)?.givenName,
              family: (profile?.name as any)?.familyName,
              username: (profile?.email as any)!.split("@")[0],
              photo: profile?.image || (profile as any)?.picture,
            },
          });
          user.id = newUser.id;
          user.email = newUser.email;
          user.name = newUser.name;
          (user as User).photo = newUser.photo;
        } else {
          user.id = existingUser.id;
          user.email = existingUser.email;
          user.name = existingUser.name;
          (user as User).photo = existingUser.photo;
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
