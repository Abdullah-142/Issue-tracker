"use client";
import { Skeleton } from "@/app/components";
import { Avatar, Box, DropdownMenu, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { Bug } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-0  mx-5 items-center py-4 ">
      <div className="flex gap-10 items-center">
        <Box>
          <Link href="/">
            <Bug size={32} />
          </Link>
        </Box>
        <NavLink />
      </div>
      <div>
        <Status />
      </div>
    </nav>
  );
}

const NavLink = () => {
  const pathname = usePathname();
  const lists = [
    { name: "Dashboard", path: "/" },
    { name: "Issues", path: "/issues" },
  ];
  return (
    <ul className="flex gap-8 justify-between items-center text-xl font-normal">
      {lists.map((list) => (
        <Link
          key={list.path}
          className={classNames({
            "nav-link": true,
            "!text-zinc-900": pathname === list.path,
          })}
          href={list.path}
        >
          {list.name}
        </Link>
      ))}
    </ul>
  );
};

const Status = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width={"3rem"} />;
  if (status === "unauthenticated")
    return <Link className='text-xl nav-link' href="/api/auth/signin">Sign in</Link>;
  return (
    <Box className="text-2xl font-normal">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            src={session!.user!.image!}
            fallback="?"
            size="3"
            radius="full"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label className="flex-col mb-4">
            <Text size="2" weight={"bold"}>
              {session!.user!.email}
            </Text>
             <Text className="self-start" weight={"bold"} size={'2'}>
              {session!.user!.name}
             </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link className="mx-auto text-[15px]" href="/api/auth/signout">
              Sign out
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

