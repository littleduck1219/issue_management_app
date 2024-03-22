import { IssueStatusBadge } from "@/app/_components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function IssueContent({ issue }: { issue: Issue }) {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex my='2' className='space-x-3'>
                <IssueStatusBadge status={issue.status} />
                <Text>{new Date(issue.createdAt).toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full' mt='4'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    );
}
