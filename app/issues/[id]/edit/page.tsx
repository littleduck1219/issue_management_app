import React from "react";
import {prisma} from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

interface Props {
    params: { id: string };
}

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
});

export default async function EditIssuePage({ params }: Props) {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });

    if (!issue) notFound();

    return <IssueForm issue={issue} />;
}
