"use client";

import { Button, Text, TextField, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>

export default function NewIssuePage() {
    const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>(
        {resolver: zodResolver(createIssueSchema)}
    );
    const router = useRouter();
    const [error, setError] = useState("")

    return (
        <div className="max-w-xl">
            {error && (
            <Callout.Root color="red">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>)}
            <form
                className='space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post("/api/issues", data);
                        router.push("/issues");
                    } catch (error) {
                        setError("예상치 못한 에러 발생")
                    }
                })}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register("title")} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>Create New Issue</Button>
            </form>
        </div>
    );
}