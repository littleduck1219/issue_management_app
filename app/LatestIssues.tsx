import React from "react";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./_components";

export default async function LatestIssues() {
    const issues = await prisma.issue.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        include: { assignedToUser: true },
    });

    return (
        <Card>
            <Table.Root>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify='between'>
                                    <Flex direction='column' align='start' gap='2'>
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.assignedToUser && (
                                        <Avatar
                                            src={issue.assignedToUser.image!}
                                            fallback='?'
                                            size='2'
                                            radius='full'
                                        />
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    );
}
