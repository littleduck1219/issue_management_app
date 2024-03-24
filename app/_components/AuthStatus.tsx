import { Avatar, Text, Box, DropdownMenu } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

export function AuthStatus() {
    const { status, data: session } = useSession();

    if (status === "loading") return <Skeleton width='3rem' />;
    if (status === "unauthenticated") return <Link href='/api/auth/signin'>Login</Link>;

    return (
        <Box>
            {status === "authenticated" && (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar
                            src={session!.user!.image!}
                            fallback='?'
                            size='2'
                            radius='full'
                            className='cursor-pointer'
                            referrerPolicy='no-referrer'
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>
                            <Text size='2'>{session!.user!.name}</Text>
                        </DropdownMenu.Label>
                        <DropdownMenu.Item>
                            {/* <Link href='/api/auth/signout'>Logout</Link> */}
                            <button onClick={() => signOut()}>Logout</button>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            )}
        </Box>
    );
}
