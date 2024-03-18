"use client";

import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";
import { useEffect, useState } from "react";

export default function Home({ searchParams }: { searchParams: { page: string } }) {
    const [issuesData, setIssuesData] = useState<Issue[]>([]);

    useEffect(() => {
        const fetchIssuesData = async () => {
            const data = await prisma.issue.findMany();
            setIssuesData(data);
        };
        fetchIssuesData();
    }, [searchParams]);

    const open = issuesData.filter((issue) => issue.status === "OPEN").length;
    const inProgress = issuesData.filter((issue) => issue.status === "IN_PROGRESS").length;
    const closed = issuesData.filter((issue) => issue.status === "CLOSED").length;

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap='5'>
            <Flex direction='column' gap='5'>
                <IssueSummary open={open} inProgress={inProgress} closed={closed} />
                <IssueChart open={open} inProgress={inProgress} closed={closed} />
            </Flex>
            <LatestIssues />
        </Grid>
    );
}

export const dynamic = "force-dynamic";

// export const metadata: Metadata = {
//     title: "Work Manager - Dashboard",
//     description: "Can check work status and latest issues.",
// };
