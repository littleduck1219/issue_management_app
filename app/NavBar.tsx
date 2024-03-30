"use client";

import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { AuthStatus } from "@/app/_components/AuthStatus";
import { NavLinks } from "@/app/_components/NavLinks";
import Image from "next/image";

export default function NavBar() {
    return (
        <nav className='py-3 space-x-6 border-b mb-5 px-5 h-14'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'>
                            <Image src='/duck.svg' alt='logo' width={32} height={32} />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    );
}
