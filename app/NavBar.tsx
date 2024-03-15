"use client";

import { Avatar, Text, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaTasks } from "react-icons/fa";

export default function NavBar() {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    return (
        <nav className='py-3 space-x-6 border-b mb-5 px-5 h-14'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'>
                            <FaTasks />
                        </Link>
                        <ul className='flex space-x-6'>
                            {links.map((link) => (
                                <Link
                                    className={`${
                                        link.href === currentPath
                                            ? "text-zinc-900"
                                            : " text-zinc-500"
                                    } hover:text-zinc-800 transition-colors`}
                                    key={link.href}
                                    href={link.href}>
                                    {link.label}
                                </Link>
                            ))}
                        </ul>
                    </Flex>
                    <Box>
                        {status === "authenticated" && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar
                                        src={session.user!.image!}
                                        fallback='?'
                                        size='2'
                                        radius='full'
                                        className='cursor-pointer'
                                    />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size='2'>{session.user?.name}</Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href='/api/auth/signout'>Logout</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                        {status === "unauthenticated" && <Link href='api/auth/signin'>Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
}
