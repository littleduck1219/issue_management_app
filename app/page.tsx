import prisma from "@/prisma/client";
import IssueSummary from "./_components/IssueSummary";
import IssueChart from "./_components/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./_components/LatestIssues";
import { Metadata } from "next";
import { authOptions } from "./auth/authOption";

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

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

export const metadata: Metadata = {
    title: "Work Manager - Dashboard",
    description: "Can check work status and latest issues.",
};
