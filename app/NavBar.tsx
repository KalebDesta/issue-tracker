"use client";
import Link from "next/link";
import { IoBugSharp } from "react-icons/io5";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const { status, data: session } = useSession();

  return (
    <nav className="flex border-b space-x-6 h-12 items-center px-5 mb-5">
      <Link href="/">
        <IoBugSharp />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              key={link.href}
              className={classNames({
                "text-zinc-600": currentPath !== link.href,
                "text-zinc-900": currentPath === link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="api/auth/signin">Log in</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
