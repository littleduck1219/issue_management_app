import React from "react";
import { Avatar, Box, Card, Flex } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "@/app/_components";
import { IssueComment as CommentType } from "@prisma/client";
import ReactMarkdown from "react-markdown";

interface Props {
    issueId: string;
}

export default function IssueComment({ issueId }: Props) {
    const { data: comments, isLoading } = useQuery({
        queryKey: ["issue", "comment", issueId],
        queryFn: async () => {
            const response = await axios.get(`/api/issues/${issueId}/comment`);
            return response.data;
        },
        staleTime: 0,
    });

    if (isLoading) return <Spinner />;

    return (
        <>
            {comments ? (
                comments.map((comment: CommentType) => (
                    <Flex gap='4' key={comment.id}>
                        <Box>
                            <Avatar
                                src={comment?.userImage!}
                                fallback='?'
                                size='2'
                                radius='full'
                                className='cursor-pointer'
                                referrerPolicy='no-referrer'
                            />
                        </Box>
                        <Box className='w-100 flex-1'>
                            <div>{comment?.userName}</div>
                            <Card>
                                <ReactMarkdown>{comment?.comment}</ReactMarkdown>
                            </Card>
                        </Box>
                    </Flex>
                ))
            ) : (
                <div></div>
            )}
        </>
    );
}
