"use client";

import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Flex, IconButton } from "@radix-ui/themes";

export default function LoginModal() {
    const router = useRouter();
    const backToPage = () => {
        router.back();
    };

    return (
        <div className='w-full h-dvh flex items-center justify-center absolute inset-0 bg-black/30 z-10 '>
            <Flex
                direction={"column"}
                align={"center"}
                justify={"start"}
                gap={"5"}
                className='bg-white relative top-10 max-w-3xl min-w-[600px] rounded-md h-[450px] p-10'>
                <Flex justify={"end"}>
                    <IconButton onClick={backToPage} radius={"full"}>
                        <X />
                    </IconButton>
                </Flex>

                <div>
                    <div className='text-[30px]'>Login</div>
                </div>
                <button
                    type='button'
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className='text-white flex gap-4 bg-[#4285f4] hover:bg-[#4285f4]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center'>
                    <AiOutlineGoogle className='w-6 h-6' />
                    Sign in With Google
                </button>
            </Flex>
        </div>
    );
}
