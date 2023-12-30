import { Skeleton } from "@/app/components";
import { Card, Flex } from "@radix-ui/themes";

function issuedetailspage() {
  return (
    <div className="space-y-3 max-w-xl">
      <Skeleton />
      <Flex gap={"3"}>
        <Skeleton width={"5rem"} />
        <Skeleton width={'10rem'} />
      </Flex>
      <Card variant="surface" className="prose" my={"5"}>
        <Skeleton count={5} />
      </Card>
    </div>
  );
}
export default issuedetailspage;
