"use client";

import { Select } from "@radix-ui/themes";
import React from "react";

export default function IssueStatusFilter() {
    const statuses: { label: string; value: string }[] = [
        { label: "All", value: "all" },
        { label: "Open", value: "OPEN" },
        { label: "Closed", value: "CLOSED" },
        { label: "In Progress", value: "IN_PROGRESS" },
    ];

    return (
        <Select.Root>
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
