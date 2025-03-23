import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueClient from "./EditIssueClient";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  // Pass issue data to the Client Component
  return <EditIssueClient issue={issue} />;
};

export default EditIssuePage;
