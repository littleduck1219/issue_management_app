import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";

export default async function IssuesPage() {
    const issues = await prisma.issue.findMany();

    await delay(2000);

    return (
        <div>
            <div className='mb-5'>
                <Button>
                    <Link href='/issues/new'>New Issue</Link>
                </Button>
            </div>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>
                            CreatedAt(생성일자)
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                {issue.title}
                                <div className='block md:hidden'>
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>

                            <Table.Cell className='hidden md:table-cell'>
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                {issue.createdAt.toLocaleDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
}
