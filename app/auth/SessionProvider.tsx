'use client'
import React, { PropsWithChildren } from "react";
import { SessionProvider as Provider } from "next-auth/react";
export default function SessionProvider({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}
