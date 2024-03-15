import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from "@chakra-ui/react";
import EditTodo from "./EditTodo";
import { completedTodo, removeToDo, todoState } from "@/lib/features/todoSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useMemo } from "react";

export default function Todo({
  todo,
  index,
}: {
  todo: todoState;
  index: number;
}) {
  const dispatch = useAppDispatch();

  const currentDate = useMemo(() => {
    return new Date().toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }, []);

  const newDate = useMemo(() => {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);

    return nextDay.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }, []);

  const timeoutInMS = useMemo(() => {
    const inputTimeInMS: number =
      Number(todo.hrs) * 60 * 60 * 1000 + Number(todo.mins) * 60 * 1000;

    const currentTimeInMS: number =
      new Date().getHours() * 60 * 60 * 1000 +
      new Date().getMinutes() * 60 * 1000 +
      new Date().getSeconds() * 1000;

    return inputTimeInMS - currentTimeInMS;
  }, [todo.hrs, todo.mins]);

  useEffect(() => {
    const timeoutId =
      timeoutInMS >= 0
        ? setTimeout(() => {
            alert(todo.title);
            dispatch(completedTodo(index));
          }, timeoutInMS)
        : setTimeout(() => {
            alert(todo.title);
            dispatch(completedTodo(index));
          }, -1 * timeoutInMS + 86_400_000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, index, timeoutInMS, todo.title]);

  return (
    <Card width={{ md: "23%", base: "100%" }} minHeight={280}>
      <CardHeader fontStyle={"bold"} fontFamily={"cursive"}>
        <Text>
          Reminder Time : {todo.hrs <= 9 ? `0${todo.hrs}` : todo.hrs}:
          {todo.mins <= 9 ? `0${todo.mins}` : todo.mins}
        </Text>
        <Text>Reminder Date : {timeoutInMS > 0 ? currentDate : newDate}</Text>
      </CardHeader>
      <CardBody fontFamily={"cursive"}>
        <Box fontSize={18}>
          <Text textDecoration={todo.isCompleted ? "line-through" : ""}>
            Title : {todo.title}
          </Text>
          {todo.description && (
            <Text textDecoration={todo.isCompleted ? "line-through" : ""}>
              Description : {todo.description}
            </Text>
          )}
        </Box>
        <br />
        <Text color={"gray"} fontSize={15}>
          Created On:&nbsp;{currentDate}
        </Text>
      </CardBody>
      <CardFooter display={"flex"} justify={"end"} gap={1}>
        <EditTodo id={index} todo={todo} />
        <Button
          colorScheme="red"
          onClick={() => {
            dispatch(removeToDo(index));
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export const metadata = {
  title: "Todo compoenent.",
  description:
    "This component is a todo card as well as performs and memoizes necessary calculations to show the alerts to users.",
};
