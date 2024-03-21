"use client";
import { Spinner } from "@/app/components";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

function Deleteissue({ issueid }: { issueid: string }) {
  const [error, seterror] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const router = useRouter();
  const deleteissue = async () => {
    try {
      setloading(true);
      const response = await fetch(`/api/issues/${issueid}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        seterror(true);
        setloading(false);
        return;
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      seterror(true);
      setloading(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger
          className="hover:cursor-pointer"
        >
          <Button className="bg-red-400" disabled={loading}>
            {loading && <Spinner />}
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Revoke access</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure ? This Action cannot be undo.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                className="bg-red-400"
                onClick={deleteissue}
              >
                Continue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Description size="2">
            There is an error while deleting the issue
          </AlertDialog.Description>
          <Button
            variant="solid"
            mt={"3"}
            color="blue"
            onClick={() => seterror(false)}
          >
            Continue
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default Deleteissue;
