import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
    const currentPath = usePathname();
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    return (
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
    );
}
