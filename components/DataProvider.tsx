import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

export async function DataProvider(props: { children: React.ReactNode }) {
  const session = await auth();

  return <SessionProvider session={session}>{props.children}</SessionProvider>;
}
