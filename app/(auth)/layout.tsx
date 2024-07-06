import AppLogo from "@/components/AppLogo";
import AppTitle from "@/components/AppTitle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

export type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <header className="w-full h-fit">
        <nav className="flex p-2 gap-2 items-center ">
          <AppLogo />
          <AppTitle />
          <ThemeToggle />
        </nav>
      </header>

      <main className="flex m-2 mx-auto w-full h-[calc(100vh-80px)] max-w-md flex-col justify-center items-center ">
        {children}

        <Link
          className={buttonVariants({ variant: "link", className: "m-4" })}
          href="/"
        >
          &#8592; Back to home
        </Link>
      </main>
    </>
  );
};

export default AuthLayout;
