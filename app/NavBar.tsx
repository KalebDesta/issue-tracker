"use client";
import Link from "next/link";
import { IoBugSharp } from "react-icons/io5";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const { status, data: session } = useSession();

  return (
    <nav className=" border-b px-5 mb-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex gap="3" align={"center"}>
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback={"?"}
                    radius="full"
                    size="2"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    {session.user!.email!}
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="api/auth/signin">Log in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
