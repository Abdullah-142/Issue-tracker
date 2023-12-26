import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import LoadingSkeleton from "./loading";
interface Props {
  params: { id: string };
}
const FormData = dynamic(() => import("@/app/issues/_component/FromData"), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

export default async function EditIssuePage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: id } });
  if (!issue) notFound();

  return (
    <div>
      <FormData issue={issue} />
    </div>
  );
}
