import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { auth } from "@/lib/auth";
import GuestMenu from "@/components/GuestMenu";
import AppLogo from "@/components/AppLogo";
import AppTitle from "@/components/AppTitle";

async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      {children}
    </>
  );
}

export default HomeLayout;
