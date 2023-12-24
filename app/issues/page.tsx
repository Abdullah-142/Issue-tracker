import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
function IssuePage() {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </div>
    
  );
}

export default IssuePage;
