import { Flex } from "@chakra-ui/react";
import ReminderCard from "./components/ReminderCard";
import Todos from "./components/Todos";

export default function Page() {
  return (
    <Flex
      paddingLeft={"1%"}
      flexDirection={{ base: "column", md: "row" }}
      flexWrap={"wrap"}
      gap={{ base: 2, md: 2 }}
    >
      <ReminderCard />
      <Todos />
    </Flex>
  );
}
