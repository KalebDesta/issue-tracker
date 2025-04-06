import { NextRequest, NextResponse } from "next/server";
import AuthOptions from "../../auth/[...nextauth]/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/client";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const id = new URL(request.url).pathname.split("/").pop();
  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { message: "Invalid solution ID" },
      { status: 400 }
    );
  }

  const solution = await prisma.solution.findUnique({
    where: { id: parseInt(id) },
  });

  if (!solution) {
    return NextResponse.json(
      { message: "Solution with the given ID could not be found" },
      { status: 404 }
    );
  }

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const sessionUser = await prisma.user.findUnique({
    where: {
      name: session.user?.name ?? undefined,
      email: session.user?.email ?? undefined,
    },
  });

  if (sessionUser?.id !== solution.providerUserId) {
    return NextResponse.json(
      { message: "Cannot edit another user's solution" },
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

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const id = new URL(request.url).pathname.split("/").pop();
  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { message: "Invalid solution ID" },
      { status: 400 }
    );
  }

  const solution = await prisma.solution.findUnique({
    where: { id: parseInt(id) },
  });

  if (!solution) {
    return NextResponse.json(
      { message: "Solution with the given ID could not be found" },
      { status: 404 }
    );
  }

  const sessionUser = await prisma.user.findUnique({
    where: {
      name: session.user?.name ?? undefined,
      email: session.user?.email ?? undefined,
    },
  });

  const providerUser = await prisma.user.findUnique({
    where: { id: solution.providerUserId },
  });

  if (sessionUser?.id !== solution.providerUserId && !providerUser?.isAi) {
    return NextResponse.json(
      { message: "Cannot delete another user's solution" },
      { status: 401 }
    );
  }

  await prisma.solution.delete({
    where: { id: solution.id },
  });

  return NextResponse.json({}, { status: 200 });
}
