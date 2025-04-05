import {
  authenticate,
  checkExistingSolution,
  findAiUser,
} from "@/app/api/middleware";
import aiAssistance from "@/app/utils/aiAssistant";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const issueId = parseInt(body.issueId);

  if (!issueId || isNaN(issueId)) {
    return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
  }

  // Middleware: Authentication
  const { error: authError } = await authenticate();
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 });
  }
  // Middleware: AI Assistant Lookup
  const { user: aiUser, error: aiError } = await findAiUser();
  if (aiError) {
    return NextResponse.json({ error: aiError }, { status: 500 });
  }

  // Middleware: Check for Existing AI-generated Solution
  const existingSolution = await checkExistingSolution(issueId, aiUser!.id);
  if (existingSolution) {
    return NextResponse.json(existingSolution, { status: 200 });
  }

  // Fetch Issue
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  try {
    // Generate Solutions with Steps
    const solution = await aiAssistance(issue);

    if (!solution)
      return NextResponse.json(
        { error: "Solutions could not be generated" },
        { status: 500 }
      );
    // Format into Markdown with steps included
    const markdownDescription = `
- **Cause:** ${solution.cause}
- **Solution:** ${solution.proposal}
- **Instructions:** 
${solution.instructions
  .map((step, stepIndex) => `  ${stepIndex + 1}. ${step}`) // Use numbered list for instructions
  .join("\n")}
`;
    // Create and store the solution
    const newSolution = await prisma.solution.create({
      data: {
        issueId: issue.id,
        description: markdownDescription,
        providerUserId: aiUser!.id,
      },
      include: {
        providerUser: true,
        issue: true,
      },
    });

    return NextResponse.json(newSolution, { status: 201 });
  } catch (error) {
    console.error("AI Assistance Error:", error);
    return NextResponse.json(
      { error: "Failed to generate solution" },
      { status: 500 }
    );
  }
}
