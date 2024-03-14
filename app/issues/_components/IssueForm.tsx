"use client";

import { Button, TextField, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

type IssueFormData = z.infer<typeof issueSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) });
    const router = useRouter();
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);

            if (issue) {
                await axios.patch("/api/issues/" + issue.id, data);
            } else {
                await axios.post("/api/issues", data);
            }
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setSubmitting(false);
            setError("예상치 못한 에러 발생");
        }
    });

    return (
        <div className='max-w-xl'>
            {error && (
                <Callout.Root color='red'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input
                        defaultValue={issue?.title}
                        placeholder='Title'
                        {...register("title")}
                    />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    defaultValue={issue?.description}
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? "Update Issue" : "New Issue"}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
}
