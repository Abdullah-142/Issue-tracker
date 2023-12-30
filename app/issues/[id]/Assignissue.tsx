"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";

export default function Assignissue({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = UseUser();
  const router = useRouter();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = async (value: string) => {
    const userId = value === " " ? null : value;
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignToUserId: userId,
      });
      router.refresh();
    } catch (error) {
      toast.error("Failed to assign issue");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignToUserId || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign.." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggistons</Select.Label>
            <Select.Item value=" ">Unassign..</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
          <Select.Separator />
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

const UseUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 2,
  });
