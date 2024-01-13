"use client";
import { Box, SimpleGrid } from "@chakra-ui/react";
import InputCard, { ToDo } from "./components/InputCard";
import ReminderCard from "./components/ReminderCard";
import { useSelector } from "react-redux";
export default function Home() {
  const todos = useSelector((state: { todos: ToDo[] }) => state.todos);
  console.log(todos);
  return (
    <Box margin={"1%"}>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {todos.map((todo: ToDo) => {
          return (
            <ReminderCard
              key={todo.id}
              id={todo.id}
              text={todo.text}
              hr={todo.hr}
              min={todo.min}
              isCompleted={todo.isCompleted}
            />
          );
        })}
        <InputCard />
      </SimpleGrid>
    </Box>
  );
}
