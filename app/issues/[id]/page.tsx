import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Button from "./EditButton";
import Details from "./Details";
import Deleteissue from "./Deleteissue";
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
        sm: "5",

      }}
    >
      <Box className="md:col-span-4">
        <Details issue={issue} />
      </Box>
      <Box>
        <Flex direction={"column"} gap={"2"}>
          <Button issueid={issue.id} />
          <Deleteissue issueid={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
}
