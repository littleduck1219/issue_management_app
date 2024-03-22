"use client";

import { Avatar, Flex, Select } from "@radix-ui/themes";
import React from "react";
import { Issue } from "@prisma/client";
import axios from "axios";
import Skeleton from "@/app/_components/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import { useUsers } from "@/app/issues/_lib/query";

export default function AssignSelect({ issue }: { issue: Issue }) {
    const { data: users, error, isLoading } = useUsers();

    if (isLoading) return <Skeleton />;
    if (error) return null;

    const assignIssue = (userId: string) => {
        axios
            .patch("/api/issues/" + issue.id, {
                assignedToUserId: userId === "unassigned" ? null : userId,
            })
            .catch(() => toast.error("Failed to update assigned user"));
    };

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || "unassigned"}
                onValueChange={assignIssue}>
                <Select.Trigger placeholder='manager' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value='unassigned'>Not Selected Assigned</Select.Item>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>
                                <Flex gap='3'>
                                    <Avatar
                                        src={user.image || undefined}
                                        fallback='?'
                                        size='1'
                                        radius='full'
                                    />
                                    {user.name}
                                </Flex>
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    );
}
