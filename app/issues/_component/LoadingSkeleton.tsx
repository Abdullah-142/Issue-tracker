import React from "react";
import { Skeleton } from "@/app/components";

export default function LoadingSkeleton() {
  return (
    <div className="max-w-xl">
      <Skeleton height={"1.6rem"} />
      <Skeleton height={"20rem"} />
    </div>
  );
}
