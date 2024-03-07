import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { PackageCheckIcon } from "lucide-react";
import Link from "next/link";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="flex p-2 gap-2 items-center">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          <PackageCheckIcon size={30} />
        </Link>

        <h5 className="flex-grow flex items-center">Todo App</h5>

        <ThemeToggle />
      </nav>
      <div className="w-full border-b" />
      {children}
    </>
  );
}

export default layout;
