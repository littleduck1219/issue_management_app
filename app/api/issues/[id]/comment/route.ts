import { authOptions } from "@/app/auth/authOption";
import prisma from "@/prisma/client";
import { issueCommentSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface CustomSession {
    user?: {
        id?: string;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const comment = await prisma.issueComment.findMany({
        where: { issueId: parseInt(params.id) },
    });
    return NextResponse.json(comment);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const customSession: CustomSession = session?.user ? { user: session?.user } : {};
    const userId = customSession?.user?.id || "";

    console.log("customSession", customSession);

    if (!session) {
        return NextResponse.json({}, { status: 401 });
    }

    const body = await request.json();
    const validation = issueCommentSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const newComment = await prisma.issueComment.create({
        data: {
            userName: customSession?.user?.name,
            userImage: customSession?.user?.image,
            comment: body.comment,
            issueId: parseInt(params.id),
            userId: customSession?.user?.id,
        },
    });

    return NextResponse.json(newComment, { status: 201 });
}
