import React from "react";
import ReactMarkdown from "react-markdown";
import delay from "delay";
import { Box } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import SimpleMDE from "react-simplemde-editor";
import Spinner from "@/app/components/Spinner";
import { Controller } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

export default function LoadingNewIssuePage() {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Skeleton height='20rem' />
        </Box>
    );
}
