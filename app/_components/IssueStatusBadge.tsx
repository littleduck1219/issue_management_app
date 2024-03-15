import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
    status: Status;
}

interface StatusMapType {
    label: string;
    color: "red" | "violet" | "green";
}

const statusMap: Record<Status, StatusMapType> = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" },
};

export default function  IssueStatusBadge({ status }: Props) {
    return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
}
