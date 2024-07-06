"use client";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "next-auth";
import { Separator } from "./ui/separator";
import { logout } from "@/actions/auth/logout";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserMenuProps = {
  user: User;
};

export const UserMenu: FC<UserMenuProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="User Icon">
          <Avatar className="w-6 h-6">
            <AvatarImage
              alt="user image"
              src={user.image as string | undefined}
            />
            <AvatarFallback>
              {user.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem aria-label="dashboard" asChild>
          <Link href="dashboard" className="cursor-pointer">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem aria-label="profile" asChild>
          <Link href="/profile" className="cursor-pointer">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem aria-label="send email" asChild>
          <Link href="/send-email" className="cursor-pointer">
            Send E-Mail
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
