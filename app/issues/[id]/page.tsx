import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    const numericId = parseInt(params.id, 10);
    if (isNaN(numericId) || numericId.toString() !== params.id) notFound();
    if (!issue) notFound();

    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    );
}
