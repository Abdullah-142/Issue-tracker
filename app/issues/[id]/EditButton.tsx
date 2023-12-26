import { Button as Radixbutton } from "@radix-ui/themes";
import { FileEdit } from "lucide-react";
import Link from "next/link";

export default function Button({ issueid }: { issueid: string }) {
  return (
    <>
      <Radixbutton>
        <FileEdit size={15} />
        <Link href={`/issues/${issueid}/edit`}>Edit issue</Link>
      </Radixbutton>
    </>
  );
}
