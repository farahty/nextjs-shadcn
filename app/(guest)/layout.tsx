import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { PackageCheckIcon } from "lucide-react";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

export type GuestLayoutProps = {
  children: ReactNode;
};

const GuestLayout: FC<GuestLayoutProps> = ({ children }) => {
  return (
    <>
      <header className="w-full h-fit">
        <nav className="flex p-2 gap-2 items-center ">
          <Link href="/" className={buttonVariants({ variant: "link" })}>
            <PackageCheckIcon size={30} />
          </Link>

          <h5 className="flex-grow flex items-center">Todo App</h5>

          <ThemeToggle />
        </nav>
      </header>

      <main className="mx-auto w-full">{children}</main>
    </>
  );
};

export default GuestLayout;
