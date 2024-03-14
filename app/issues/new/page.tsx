import React, { useState } from "react";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
});

export default async function NewIssuePage() {
    return <IssueForm />;
}
