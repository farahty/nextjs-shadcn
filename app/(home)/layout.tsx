import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { PackageCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <header className="w-full fixed h-fit top-0 backdrop-blur">
        <nav className="flex p-2 gap-2 items-center ">
          <Link href="/" className={buttonVariants({ variant: "link" })}>
            <PackageCheckIcon size={30} />
          </Link>

          <h5 className="flex-grow flex items-center">Todo App</h5>

          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <ul className="flex gap-4">
              <li>
                <Link
                  href={"/api/auth/signin"}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "w-auto px-2"
                  )}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href={"/api/auth/signin"}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "w-auto px-2"
                  )}
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
          <ThemeToggle />
        </nav>
      </header>
      <div className="w-full h-10" />
      {children}
    </>
  );
}

export default layout;
