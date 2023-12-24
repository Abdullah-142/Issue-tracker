"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import React from "react";

function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root>
        <TextField.Input placeholder="Input" />
      </TextField.Root>
      <SimpleMDE placeholder="Reply to comment…" />
      <Button className="">Submit Issue</Button>
    </div>
  );
}

export default NewIssuePage;
