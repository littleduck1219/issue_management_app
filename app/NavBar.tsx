"use client";

import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FaTasks } from "react-icons/fa";
import { AuthStatus } from "@/app/_components/AuthStatus";
import { NavLinks } from "@/app/_components/NavLinks";

export default function NavBar() {
    return (
        <nav className='py-3 space-x-6 border-b mb-5 px-5 h-14'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/home'>
                            <FaTasks />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    );
}
