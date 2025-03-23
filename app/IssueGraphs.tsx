"use client";
import { Card } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend,
  Tooltip,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueGraphs = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; count: number }[] = [
    { label: "Open", count: open },
    { label: "In Progress", count: inProgress },
    { label: "Closed", count: closed },
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
