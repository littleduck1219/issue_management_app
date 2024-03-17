"use client";

import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

export default function IssueChart({ open, inProgress, closed }: Props) {
    const data = [
        { name: "Open", value: open },
        { name: "In Progress", value: inProgress },
        { name: "Closed", value: closed },
    ];

    return (
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data}>
                <XAxis dataKey='label' />
                <YAxis />
                <Bar dataKey='value' barSize={60} style={{ fill: "var(--accent-9)" }} />
            </BarChart>
        </ResponsiveContainer>
    );
}
