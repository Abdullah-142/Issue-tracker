"use client";
import { Bug } from "lucide-react";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const lists = [
    { name: "Dashboard", path: "/" },
    { name: "Issues", path: "/issues" },
  ];
  return (
    <nav className="flex gap-8 items-center h-14  p-8 ">
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
      </ul>
    </nav>
  );
}

export default Navbar;
