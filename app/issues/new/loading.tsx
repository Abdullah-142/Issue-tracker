import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function loadingnewpage() {
  return (
    <div className="max-w-xl">
        loading....
        <Skeleton width={"10rem"} />
      <Skeleton count={10} />
    </div>
  );
}
