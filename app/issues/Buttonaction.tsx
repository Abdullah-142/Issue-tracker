import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

function Buttonaction() {
  return (
    <div className="mb-6 flex justify-between">
      <div>
        <IssueStatusFilter />
      </div>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </div>
  );
}

export default Buttonaction;
