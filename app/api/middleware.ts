import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import AuthOptions from "./auth/[...nextauth]/authOptions";

export async function authenticate(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session || !session.user || !session.user.email) {
    return {
      error: "Unauthorized",
      response: NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      ),
    };
  }

  return { session, error: null };
}

export async function findAiUser() {
  const aiUser = await prisma.user.findFirst({
    where: { isAi: true },
  });

  if (!aiUser) {
    return { error: "AI Assistant user not found", user: null };
  }

  return { user: aiUser, error: null };
}

export async function checkExistingSolution(issueId: number, aiUserId: string) {
  const existingSolution = await prisma.solution.findFirst({
    where: {
      issueId: issueId,
      providerUserId: aiUserId, // Only AI-generated solutions
    },
  });

  return existingSolution;
}
