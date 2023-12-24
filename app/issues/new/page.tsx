"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Axios } from "axios";
interface formdata {
  title: string;
  description: string;
}
function NewIssuePage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<formdata>();
  return (
    <div className="max-w-xl space-y-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            const response = await fetch("/api/issues", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) {
              setError("An unexpected error occured");
              return;
            }
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Input" {...register("title")} />
        </TextField.Root>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder="Description"
              className="rounded-md"
            />
          )}
        />
        <Button className="">Submit Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
