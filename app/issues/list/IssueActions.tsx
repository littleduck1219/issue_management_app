import { Flex, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

export default function IssueActions() {
    return (
        <Flex className='mb-5' justify='between'>
            <IssueStatusFilter />
            <Button>
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </Flex>
    );
}
