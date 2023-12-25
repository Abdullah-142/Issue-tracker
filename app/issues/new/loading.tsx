import React from "react";
import { Skeleton } from "@/app/components";

export default function loadingnewpage() {
  return (
    <div className="max-w-xl">
      loading....
      <Skeleton width={"10rem"} />
      <Skeleton count={10} />
    </div>
  );
}
