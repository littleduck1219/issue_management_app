"use client";

import { Spinner } from "@/app/_components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const onDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.delete("/api/issues/" + issueId);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setIsDeleting(false);
            setError(true);
        }
    };

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button
                        className='bg-red-500 rounded-md py-2 text-white text-xs font-bold'
                        disabled={isDeleting}>
                        Delete Issue {isDeleting && <Spinner />}
                    </button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>want to delete issue?</AlertDialog.Description>
                    <Flex mt='4' gap='3'>
                        <AlertDialog.Cancel>
                            <button className='bg-white border border-gray-500 rounded-md px-4'>
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <button
                                className='bg-red-500 rounded-md px-2 text-white text-xs font-bold'
                                onClick={onDelete}>
                                Delete
                            </button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>Something went wrong</AlertDialog.Description>
                    <button
                        className='mt-2 bg-gray-200 border border-gray-300 rounded-md px-3 py-1 text-sm'
                        onClick={() => setError(false)}>
                        ok
                    </button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
}
