"use client";
import { Error, Spinner } from "@/app/components";
import { issueschema } from "@/app/validationschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMde from "react-simplemde-editor";
import { z } from "zod";
type IssueData = z.infer<typeof issueschema>;

function FormData({ issue }: { issue?: Issue }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueData>({
    resolver: zodResolver(issueschema),
  });

  const onSubmit = async (data: IssueData) => {
    try {
      setLoading(true);
      const endpoint = issue ? `/api/issues/${issue.id}` : "/api/issues"; // Include id in the URL for PATCH
      const method = issue ? "PATCH" : "POST"; // Determine the method based on whether there is data in issue
      const response = await fetch(endpoint, {
        method: method,
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
      router.refresh();
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
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <Error>{errors.title?.message}</Error>
        <Controller
          control={control}
          defaultValue={issue?.description}
          name="description"
          render={({ field }) => (
            <SimpleMde
              {...field}
              placeholder="Description"
              className="rounded-md"
            />
          )}
        />
        <Error>{errors.description?.message}</Error>
        <Button disabled={loading}>
          {issue ? "Update Issue" : "Create Issue"}
          {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default FormData;
