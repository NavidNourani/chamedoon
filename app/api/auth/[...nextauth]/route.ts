import { login } from "@/serverActions/user/login";
import NextAuth, { AuthOptions } from "next-auth";
import credentialProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return { ...token, ...user };
    },
    session({ session, token, user }) {
      session.user = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
