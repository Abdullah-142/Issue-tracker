import React from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "./loading";
const FormData = dynamic(() => import("@/app/issues/_component/FromData"), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

export default function Newissuepage() {
  return (
    <div>
      <FormData />
    </div>
  );
}
