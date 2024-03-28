import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOption";

interface CustomSession {
    user?: {
        id?: string;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const customSession: CustomSession = session?.user ? { user: session?.user } : {};
    const userId = customSession?.user?.id || "";

    if (!session) {
        return NextResponse.json({}, { status: 401 });
    }

    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description, userId },
    });

    return NextResponse.json(newIssue, { status: 201 });
}
