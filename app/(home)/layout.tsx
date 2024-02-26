import { ThemeToggle } from "@/components/ThemeToggle";
import { GrabIcon } from "lucide-react";
export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="flex p-2 gap-2  ">
        <GrabIcon size={30} />

        <div className="flex-grow flex items-center">app navigator</div>

        <ThemeToggle />
      </nav>
      <div className="w-full border-b" />
      {children}
    </>
  );
}
