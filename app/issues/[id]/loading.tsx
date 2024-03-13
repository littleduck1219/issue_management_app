import Skeleton from "@/app/components/Skeleton";
import { Flex, Heading, Text, Card, Box } from "@radix-ui/themes";
import React from "react";


export default function LoadingIIssueDetailPage() {
    return (
        <Box>
            <Skeleton />
            <Flex my='2' className='space-x-3'>
                <Skeleton width='5rem' />
                <Skeleton width='8rem' />
            </Flex>
            <Card className='prose' mt='4'>
                <Skeleton count={3} />
            </Card>
        </Box>
    );
}
