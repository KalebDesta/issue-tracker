"use client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  column: string;
  currentOrder: "asc" | "desc";
}

const IssuesSortingButton = ({ column, currentOrder }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleSorting = () => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";

    const query = new URLSearchParams(searchParams.toString());
    query.set("orderBy", column);
    query.set("order", newOrder);

    router.push(`?${query.toString()}`);
  };

  return (
    <button onClick={toggleSorting}>
      {currentOrder === "asc" ? (
        <ArrowUpIcon className="inline" />
      ) : (
        <ArrowDownIcon className="inline" />
      )}
    </button>
  );
};

export default IssuesSortingButton;
