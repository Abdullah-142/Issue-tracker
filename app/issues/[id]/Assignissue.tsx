"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

export default function Assignissue() {
  const [data, setdata] = React.useState<User[]>([]);
  const Fetchdata = async () => {
    const res = await fetch("/api/users", {});
    const users = await res.json();
    setdata(users);
    console.log(users);
  };

  React.useEffect(() => {
    Fetchdata();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign.." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggistons</Select.Label>
          {data.map((user) => (
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
