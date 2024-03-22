import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOption";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });
    return NextResponse.json(issue);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { assignedToUserId, title, status, description } = body;

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const updateIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            status,
            description,
            assignedToUserId,
        },
    });

    return NextResponse.json(updateIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({}, { status: 401 });
    }

    await delay(3000);

    const issue = await prisma?.issue.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    await prisma.issue.delete({ where: { id: issue.id } });

    return NextResponse.json({});
}
