"use client"; // ✅ Mark this as a Client Component

import dynamic from "next/dynamic";
import EditIssueLoading from "./loading";
import { Issue } from "@prisma/client";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <EditIssueLoading />,
});

interface Props {
  issue: Issue;
}

const EditIssueClient = ({ issue }: Props) => {
  return <IssueForm issue={issue} />;
};

export default EditIssueClient;
