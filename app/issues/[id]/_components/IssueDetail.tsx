"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueContent from "./IssueContent";
import DeleteIssueButton from "./DeleteIssueButton";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AssignSelect from "../../_components/AssignSelect";
import Loading from "../loading";

interface Props {
    params: { id: string };
}

export default function IssueDetail({ params }: Props) {
    const { data: session } = useSession();

    const { data: issue, isLoading } = useQuery({
        queryKey: ["issue"],
        queryFn: async () => {
            const response = await axios.get(`/api/issues/${params.id}`);
            return response.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <>
            <Grid columns={{ initial: "1", md: "5" }} gap='5'>
                <Box className='md:col-span-4'>
                    <IssueContent issue={issue} />
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
        </>
    );
}
