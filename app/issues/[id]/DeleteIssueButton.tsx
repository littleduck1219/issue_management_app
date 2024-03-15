"use client";

import { Spinner } from "@/app/components";
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
                    <Button color='red' disabled={isDeleting}>
                        Delete Issue {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>want to delete issue?</AlertDialog.Description>
                    <Flex mt='4' gap='3'>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button onClick={onDelete} color='red'>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>Something went wrong</AlertDialog.Description>
                    <Button color='gray' variant='soft' mt='2' onClick={() => setError(false)}>
                        ok
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
}
