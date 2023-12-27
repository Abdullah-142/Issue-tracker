"use client";
import { Bug } from "lucide-react";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Navbar() {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const lists = [
    { name: "Dashboard", path: "/" },
    { name: "Issues", path: "/issues" },
  ];
  return (
    <nav className="flex gap-8  items-center h-14  py-10 ">
      <Link href="/">
        <Bug size={32} />
      </Link>
      <ul className="flex gap-8 text-xl">
        {lists.map((list) => (
          <Link
            key={list.path}
            className={classNames({
              "text-zinc-900": pathname === list.path,
              "text-zinc-500": pathname !== list.path,
              "hover-text-zinc-800 transition-colors": true,
            })}
            href={list.path}
          >
            {list.name}
          </Link>
        ))}
        <div>
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Sign in</Link>
          )}
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Signout</Link>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
