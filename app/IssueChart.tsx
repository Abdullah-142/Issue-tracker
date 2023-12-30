"use client";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
interface Props {
  open: number;
  closed: number;
  inProgress: number;
}
export default function IssueChart({ open, closed, inProgress }: Props) {
  const data = [
    {
      lable: "Open",
      value: open,
    },
    {
      lable: "Closed",
      value: closed,
    },
    {
      lable: "In Progress",
      value: inProgress,
    },
  ];
  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} >
          <XAxis dataKey="lable" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={30}
            style={{fill:'var(--accent-9)'}}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
