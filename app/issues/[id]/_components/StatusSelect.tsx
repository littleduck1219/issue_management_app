"use client";

import React from "react";
import { Avatar, Flex, Select } from "@radix-ui/themes";
import { Issue, Status } from "@prisma/client";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStatus } from "@/app/_lib/store/useStatus";

export default function StatusSelect({ issue }: { issue: Issue }) {
    const queryClient = useQueryClient();
    const statuses: { label: string; value: string; status: Status }[] = [
        { label: "Open", value: "open", status: "OPEN" },
        { label: "In Progress", value: "inProgress", status: "IN_PROGRESS" },
        { label: "Closed", value: "closed", status: "CLOSED" },
    ];
    const stateStatue = useStatus();

    const updateIssueStatus = useMutation({
        mutationKey: ["issue"],
        mutationFn: async (status: Status) => {
            return axios.patch(`/api/issues/${issue.id}`, { status });
        },

        onSuccess: (data, variables) => {
            stateStatue.setStatus(variables);
            console.log(variables);
            queryClient.invalidateQueries({ queryKey: ["issue"] });
        },
        onError: (error) => {
            console.error("Error updating issue status:", error);
        },
    });

    const handleStatusChange = (selectedStatus: Status) => {
        updateIssueStatus.mutate(selectedStatus);
    };

    return (
        <>
            <Select.Root defaultValue={issue.status} onValueChange={handleStatusChange}>
                <Select.Trigger placeholder='status' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Status</Select.Label>
                        <Select.Item value='OPEN'>Open</Select.Item>
                        <Select.Item value='IN_PROGRESS'>In Progress</Select.Item>
                        <Select.Item value='CLOSED'>Closed</Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </>
    );
}
