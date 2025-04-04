import { prisma } from "@/prisma/client";
import { Issue, Solution } from "@prisma/client";
import SolutionDetailClient from "./SolutionDetailClient";

const SolutionDetail = async ({
  solution,
  issue,
}: {
  solution: Solution;
  issue: Issue;
}) => {
  const user = await prisma.user.findUnique({
    where: { id: solution.providerUserId },
  });

  if (!user) return null;

  return <SolutionDetailClient user={user} solution={solution} issue={issue} />;
};

export default SolutionDetail;
