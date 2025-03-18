"use client";
import dynamic from "next/dynamic";
import NewIssueLoadingPage from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <NewIssueLoadingPage />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
