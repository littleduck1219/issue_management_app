"use client";

import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value: string }[] = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
];

export default function IssueStatusFilter() {
    const router = useRouter();

    return (
        <Select.Root
            onValueChange={(status) => {
                const query = status ? `?status=${status}` : "";
                router.push(`/issues/list/${query}`);
            }}>
            <Select.Trigger placeholder='status filtering' />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value || "ALL"}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
}
