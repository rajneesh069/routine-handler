"use client"
import Todo from "./Todo";
import { todoState } from "@/lib/features/todoSlice";
import { useAppSelector } from "@/lib/hooks";

const Todos = () => {
  const todos: todoState[] = useAppSelector((state) => state.todo);

  return todos.map((todo, index) => (
    <Todo todo={todo} index={index} key={index} />
  ));
};

export default Todos;
