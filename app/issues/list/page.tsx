import React from "react";
import prisma from "@/prisma/client";
import IssueActions from "@/app/issues/list/IssueActions";
import { Status } from "@prisma/client";
import PageNation from "@/app/_components/PageNation";
import IssueTable, { IssueQuery, columnNames } from "@/app/issues/list/IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
    searchParams: IssueQuery;
}

export default async function IssuesPage({ searchParams }: Props) {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
    const orderBy = columnNames.includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: "asc" }
        : undefined;

    const where = { status };

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;
    const issues = await prisma.issue.findMany({
        where: { status },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where });

    return (
        <Flex direction='column' gap='3'>
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <PageNation pageSize={pageSize} itemCount={issueCount} currentPage={page} />
        </Flex>
    );
}

export const dynamic = "force-dynamic";
