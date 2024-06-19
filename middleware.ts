import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import NextAuth from "next-auth";
import authConfig from "./lib/auth/auth.config";

const { auth } = NextAuth(authConfig);

export const middleware = auth((request) => {
  const response = NextResponse.next();

  if (!request.cookies.has("client-id")) {
    response.cookies.set("client-id", nanoid());
  }

  return response;
});

export const config = {
  matcher: ["/((?!admin|api|_next|.*\\..*).*)"],
};
