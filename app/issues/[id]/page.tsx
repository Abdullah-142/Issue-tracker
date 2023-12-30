import { AuthOption } from "@/app/auth/AuthOption";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Assignissue from "./Assignissue";
import Deleteissue from "./Deleteissue";
import Details from "./Details";
import Button from "./EditButton";
import { cache } from "react";
interface Props {
  params: { id: string };
}
const fetchdata = cache((id: string) =>
  prisma.issue.findUnique({ where: { id: id } })
);
export default async function Detailissuepage({ params: { id } }: Props) {
  const session = await getServerSession(AuthOption);
  const issue = await fetchdata(id);
  if (!issue) notFound();
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 items-center">
      <Box className="lg:col-span-4 ">
        <Details issue={issue} />
      </Box>
      <Box className="lg:col-span-1 ">
        {session && (
          <Flex direction={"column"} gap={"3"}>
            <Assignissue issue={issue} />
            <Button issueid={issue.id} />
            <Deleteissue issueid={issue.id} />
          </Flex>
        )}
      </Box>
    </div>
  );
}

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchdata(id);
  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  };
}
