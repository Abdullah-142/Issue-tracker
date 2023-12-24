import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function Buttonaction() {
  return (
    <div className="mb-6">
      <Button>
        <Link  href="/issues/new">New issue</Link>
      </Button>
    </div>
  );
}

export default Buttonaction;

// want to add skelition loading
