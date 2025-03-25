import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { solutionSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const verifiedParams = await params;
  const issueId = parseInt(verifiedParams.id);
  if (isNaN(issueId)) {
    return NextResponse.json({ message: "Invalid issue ID" }, { status: 400 });
  }
  const validation = solutionSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue)
    return NextResponse.json(
      { message: `issue with id:${issueId} could not be found` },
      { status: 404 }
    );

  const sessionUser = await prisma.user.findUnique({
    where: { name: session.user?.name, email: session.user?.email! },
  });
  if (!sessionUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const newSolution = await prisma.solution.create({
    data: {
      providerUserId: sessionUser.id,
      issueId: issue.id,
      description: body.description,
    },
  });
  return NextResponse.json(newSolution, { status: 201 });
}
