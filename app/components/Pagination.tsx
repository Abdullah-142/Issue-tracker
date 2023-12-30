"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import page from "../page";
interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
}: Props) {
  const route = useRouter();
  const searchParams = useSearchParams();

  const pagecount = Math.ceil(itemCount / pageSize);
  if (pagecount <= 1) return null;
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    route.push("?" + params.toString());
  };
  return (
    <Flex align={"center"} gap={"2"}>
      <Text size={"2"}>
        Page {currentPage} of {pagecount}
      </Text>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ArrowLeft />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pagecount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ArrowRight />
      </Button>
    </Flex>
  );
}
