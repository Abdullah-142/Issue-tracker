"use client";
import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useQuery } from "react-query";

export default function Assignissue() {
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users", {});
      const users = await res.json();
      return users;
    },
    staleTime: 60 * 1000,
    retry: 2,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign.." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggistons</Select.Label>
          {data?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
        <Select.Separator />
      </Select.Content>
    </Select.Root>
  );
}
