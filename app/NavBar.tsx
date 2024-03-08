"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaTasks } from "react-icons/fa";

export default function NavBar() {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 items-center h-14'>
            <Link href='/'>
                <FaTasks />
            </Link>
            <ul className='flex space-x-6'>
                {links.map((link) => (
                    <Link
                        className={`${
                            link.href === currentPath ? "text-zinc-900" : " text-zinc-500"
                        } hover:text-zinc-800 transition-colors`}
                        key={link.href}
                        href={link.href}>
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
}
