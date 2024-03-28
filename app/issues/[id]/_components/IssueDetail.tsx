"use client";

import React, { useMemo, useState } from "react";
import { Avatar, Box, Button, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueContent from "./IssueContent";
import DeleteIssueButton from "./DeleteIssueButton";
import { useSession } from "next-auth/react";
import axios from "axios";
import AssignSelect from "@/app/issues/_components/AssignSelect";
import Loading from "../loading";
import StatusSelect from "./StatusSelect";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueCommentSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Spinner } from "@/app/_components";
import { IssueComment as CommentType } from "@prisma/client";
import IssueComment from "./IssueComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
    params: { id: string };
}

interface CustomSession {
    user?: {
        id?: string;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
}

interface Comment {
    comment: string;
}

type IssueFormData = z.infer<typeof issueCommentSchema>;

export default function IssueDetail({ params }: Props) {
    const queryClient = useQueryClient();
    const [isSubmitting, setSubmitting] = useState(false);
    const { data: session, status } = useSession();
    const customSession: CustomSession = status === "authenticated" ? { user: session?.user } : {};
    const userId = customSession?.user?.id || "";

    const { data: issue, isLoading } = useQuery({
        queryKey: ["issue"],
        queryFn: async () => {
            const response = await axios.get(`/api/issues/${params.id}`);
            return response.data;
        },
        staleTime: 0,
    });

    const commentUpdate = useMutation<Comment, unknown, Comment>({
        mutationKey: ["issue", "comment"],
        mutationFn: async (comment) => {
            return axios.post(`/api/issues/${issue.id}/comment`, comment);
        },
        onSuccess: async (data, variables) => {
            setSubmitting(false);
            await queryClient.invalidateQueries({ queryKey: ["issue", "comment"] });
        },
        onError: (error) => {
            setSubmitting(false);
        },
    });

    console.log("issue", issue?.userId);

    console.log("session", userId);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({ resolver: zodResolver(issueCommentSchema) });

    const simpleMDEOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
        };
    }, []);

    const onSubmit = handleSubmit(async (data: Comment) => {
        setSubmitting(true);
        await commentUpdate.mutate(data);
    });

    if (isLoading) return <Loading />;

    return (
        <>
            <Flex direction='column' gap='5'>
                <Flex gap='5'>
                    <Box className='flex-1'>
                        <IssueContent issue={issue} />
                    </Box>
                    {issue?.userId === userId && (
                        <>
                            <Flex direction='column' justify='end'>
                                <Box>
                                    <Flex direction='column' gap='4'>
                                        <AssignSelect issue={issue} />
                                        <EditIssueButton issueId={issue.id} />
                                        <DeleteIssueButton issueId={issue.id} />
                                    </Flex>
                                </Box>
                            </Flex>
                        </>
                    )}
                </Flex>
                <IssueComment issueId={issue.id} />
                {session && (
                    <>
                        <form onSubmit={onSubmit}>
                            <Flex gap='4'>
                                <Box>
                                    <Avatar
                                        src={session!.user!.image!}
                                        fallback='?'
                                        size='2'
                                        radius='full'
                                        className='cursor-pointer'
                                        referrerPolicy='no-referrer'
                                    />
                                </Box>
                                <Flex direction='column' className='flex-1 h-7'>
                                    <div className='font-bold'>Comment</div>
                                    <Box className='flex-1 h-7'>
                                        <Controller
                                            name='comment'
                                            control={control}
                                            render={({ field }) => (
                                                <SimpleMDE
                                                    placeholder='Comment'
                                                    {...field}
                                                    options={simpleMDEOptions}
                                                />
                                            )}
                                        />
                                        <Flex justify='end' direction='row' gap='4'>
                                            {issue?.userId === userId && (
                                                <StatusSelect issue={issue} />
                                            )}
                                            <Button disabled={isSubmitting}>
                                                Comment {isSubmitting && <Spinner />}
                                            </Button>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Flex>
                        </form>
                    </>
                )}
            </Flex>
        </>
    );
}
