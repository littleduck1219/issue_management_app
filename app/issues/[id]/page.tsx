import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
    params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
    const numericId = parseInt(params.id, 10);
    if (isNaN(numericId) || numericId.toString() !== params.id) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id: numericId },
    });

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap='5'>
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
    );
}
