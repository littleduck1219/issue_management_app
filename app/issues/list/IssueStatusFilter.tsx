"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value: string }[] = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
];

export default function IssueStatusFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    console.log(searchParams);

    return (
        <Select.Root
            defaultValue={searchParams.get("status") || ""}
            onValueChange={(status) => {
                const params = new URLSearchParams();
                if (params) params.append("status", status);
                if (searchParams.get("orderBy"))
                    params.append("orderBy", searchParams.get("orderBy")!);
                const query = params.size ? "?" + params.toString() : "";
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
