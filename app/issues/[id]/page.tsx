import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Button from "./EditButton";
import Details from "./Details";
import Deleteissue from "./Deleteissue";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/app/auth/AuthOption";
import Assignissue from "./Assignissue";
interface Props {
  params: { id: string };
}
export default async function Detailissuepage({ params: { id } }: Props) {
  const session = await getServerSession(AuthOption);
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
        {session && (
          <Flex direction={"column"} gap={"3"}>
            <Assignissue issue={issue} />
            <Button issueid={issue.id} />
            <Deleteissue issueid={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
}
