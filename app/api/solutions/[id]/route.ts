import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import AuthOptions from "../../auth/[...nextauth]/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const { id } = await params;
  const solution = await prisma.solution.findUnique({
    where: { id: parseInt(id) },
  });
  if (!solution)
    return NextResponse.json(
      { message: "Solution with the given Id could not be found" },
      { status: 404 }
    );
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const sessionUser = await prisma.user.findUnique({
    where: { name: session.user?.name, email: session.user?.email! },
  });
  if (sessionUser?.id !== solution.providerUserId) {
    return NextResponse.json(
      { message: "Cannot Edit another User's Solution" },
      { status: 401 }
    );
  }
  const modifiedSolution = await prisma.solution.update({
    data: {
      description: body.description,
    },
    where: { id: solution.id },
  });
  return NextResponse.json(modifiedSolution, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const { id } = await params;
  const solution = await prisma.solution.findUnique({
    where: { id: parseInt(id) },
  });
  if (!solution)
    return NextResponse.json(
      { message: "Solution with the given Id could not be found" },
      { status: 404 }
    );

  const sessionUser = await prisma.user.findUnique({
    where: { name: session.user?.name, email: session.user?.email! },
  });
  if (sessionUser?.id !== solution.providerUserId) {
    return NextResponse.json(
      { message: "Cannot Delete another User's Solution" },
      { status: 401 }
    );
  }
  await prisma.solution.delete({
    where: { id: solution.id },
  });
  return NextResponse.json({}, { status: 200 });
}
