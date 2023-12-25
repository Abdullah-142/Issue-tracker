import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Button from "./Button";
import Details from "./Details";
interface Props {
  params: { id: string };
}
export default async function Detailissuepage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: id } });
  if (!issue) notFound();
  return (
    <Grid
      gap={"5"}
      columns={{
        initial: " 1",
        sm: "2",
      }}
    >
      <Box>
        <Details issue={issue} />
      </Box>
      <Box>
        <Button issueid={issue.id} />
      </Box>
    </Grid>
  );
}
