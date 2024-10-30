// @ts-nocheck

import NextAuth from "next-auth";
import { authOptions } from "../../../../helpers/authOptions";

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
