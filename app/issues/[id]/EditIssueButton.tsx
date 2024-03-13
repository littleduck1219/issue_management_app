import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function EditIssueButton({ issueId }: { issueId: number }) {
    return (
        <Button>
            <Pencil2Icon />
            <Link href={`/issue/${issueId}/edit`}>Edit Issue</Link>
        </Button>
    );
}
