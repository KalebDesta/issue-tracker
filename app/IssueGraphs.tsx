"use client";
import { Card } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";
import { SummaryProp } from "./IssueSummary";

interface Props {
  summary: SummaryProp;
}

const IssueGraphs = ({ summary }: Props) => {
  const containers: { label: string; count: number }[] = [
    { label: "Open", count: summary.open },
    { label: "In Progress", count: summary.inProgress },
    { label: "Closed", count: summary.closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={containers}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" barSize={60} fill="var(--accent-9)" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueGraphs;
