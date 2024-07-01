import AppLogo from "@/components/AppLogo";
import AppTitle from "@/components/AppTitle";
import GuestMenu from "@/components/GuestMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { auth } from "@/lib/auth";
import React, { FC, ReactNode } from "react";

export type PublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout: FC<PublicLayoutProps> = async ({ children }) => {
  const session = await auth();
  return (
    <>
      <header className="w-full fixed h-fit top-0 backdrop-blur">
        <nav className="flex p-2 gap-2 items-center ">
          <AppLogo />
          <AppTitle />
          {session?.user ? <UserMenu user={session.user} /> : <GuestMenu />}
          <ThemeToggle />
        </nav>
      </header>
      <div className="w-full h-20" />
      <main className="mx-auto w-full">{children}</main>
    </>
  );
};

export default PublicLayout;
