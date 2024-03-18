import React, { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOption";
import AssignSelect from "../_components/AssignSelect";

interface Props {
    params: { id: string };
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

export default async function IssueDetailPage({ params }: Props) {
    const session = await getServerSession(authOptions);
    const numericId = parseInt(params.id, 10);
    if (isNaN(numericId) || numericId.toString() !== params.id) notFound();

    const issue = await fetchUser(parseInt(params.id));

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "5" }} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction='column' gap='4'>
                        <AssignSelect issue={issue} />
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    );
}

export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id));
    return {
        title: `Work Manager - ${issue?.title}`,
        description: "Detail of Work: " + issue?.description,
    };
}
