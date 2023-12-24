"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, FormState } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { createissueschema } from "@/app/validationschema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
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
  return (
    <div className="max-w-xl space-y-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
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
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Input" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
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
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loading} className="">
          Submit Issue
          {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
