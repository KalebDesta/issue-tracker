import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { Issue } from "@prisma/client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

const solutionFormat = z.object({
  cause: z.string(),
  proposal: z.string(),
  instructions: z
    .array(z.string())
    .describe("Step-by-step instructions to apply the fix"), // Include steps in each fix
});

async function aiAssistance(issue: Issue) {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content: `
        You are an expert consultant providing solutions to technical issues. 
        For each issue:
        - Identify the **cause**.
        - Propose a **solution**.
        - Provide **instructions** on how to apply the solution.
        **Be clear, precise, and actionable.**.
        `,
      },
      {
        role: "user",
        content: `I am dealing with ${issue.title}. ${issue.description}`,
      },
    ],
    response_format: zodResponseFormat(solutionFormat, "solution"),
  });

  return completion.choices[0].message.parsed;
}

export default aiAssistance;
