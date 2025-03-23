import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssuesStatusFilter from "./IssuesStatusFilter";

const IssuesToolBar = () => {
  return (
    <Flex mb="5" justify="between">
      <IssuesStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuesToolBar;
