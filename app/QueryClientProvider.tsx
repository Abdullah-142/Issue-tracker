"use client";
import React, { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactClientProvider,
} from "react-query";

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <ReactClientProvider client={new QueryClient()}>
      {children}
    </ReactClientProvider>
  );
}
