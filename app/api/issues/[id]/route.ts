import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import AuthOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { title, status, description, assignedUserId } = body;
  const validParams = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(validParams.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue Not Found!" }, { status: 404 });
  if (assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });
    if (!user)
      return NextResponse.json({ error: "invalid user" }, { status: 400 });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      status,
      description,
      assignedUserId,
    },
  });
  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const validParams = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(validParams.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue Not Found!" }, { status: 404 });
  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({}, { status: 200 });
}
