"use client";
import { Error, Spinner } from "@/app/components";
import { createissueschema } from "@/app/validationschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
type Issueform = z.infer<typeof createissueschema>;

function NewIssuePage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Issueform>({
    resolver: zodResolver(createissueschema),
  });

  const onSubmit = async (data: Issueform) => {
    try {
      setLoading(true);
      const response = await fetch("/api/issues", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setError("An unexpected error occured");
        setLoading(false);
        return;
      }
      router.push("/issues");
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occured");
    }
  };

  return (
    <div className="max-w-xl space-y-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Input" {...register("title")} />
        </TextField.Root>
        <Error>{errors.title?.message}</Error>
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
        <Error>{errors.description?.message}</Error>
        <Button disabled={loading} className="">
          Submit Issue
          {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
