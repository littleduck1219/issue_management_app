import { Box } from "@radix-ui/themes";
import Skeleton from "@/app/_components/Skeleton";
import React from "react";

export default function IssueFormSkeleton() {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Skeleton height='20rem' />
        </Box>
    );
}
