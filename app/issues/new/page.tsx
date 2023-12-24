"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";

import React from "react";

function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root>
        <TextField.Input placeholder="Input" />
      </TextField.Root>
      <TextArea placeholder="Reply to comment…" />
      <Button>Submit Issue</Button>
    </div>
  );
}

export default NewIssuePage;
