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
import { useEffect, useMemo, useRef } from "react";

export const MSInOneDay = 86_400_000; //(24 hours = 86_400_000ms)

export default function Todo({
  todo,
  index,
}: {
  todo: todoState;
  index: number;
}) {
  const dispatch = useAppDispatch();
  const audioRef = useRef(new Audio("/alert.mp3"));

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
      (new Date().getHours() % 24) * 60 * 60 * 1000 + //reset the clock to 24-hour format
      new Date().getMinutes() * 60 * 1000 +
      new Date().getSeconds() * 1000;

    return inputTimeInMS - currentTimeInMS;
  }, [todo.hrs, todo.mins]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    const playAudioAndCompleteTodo = () => {
      audio.play();
      alert(todo.title);
      audio.pause();
      audio.currentTime = 0;
      dispatch(completedTodo(index));
    };

    const timeoutId =
      timeoutInMS > 0
        ? setTimeout(playAudioAndCompleteTodo, timeoutInMS)
        : setTimeout(playAudioAndCompleteTodo, timeoutInMS + MSInOneDay); //add 24 hours

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, index, timeoutInMS, todo.title]);

  return (
    <Card width={{ md: "23%", base: "100%" }} minHeight={280}>
      <CardHeader fontStyle={"bold"} fontFamily={"cursive"}>
        <Text>
          Reminder Time :{" "}
          {Number(todo.hrs) <= 9 ? `0${Number(todo.hrs)}` : Number(todo.hrs)}:
          {Number(todo.mins) <= 9 ? `0${Number(todo.mins)}` : Number(todo.mins)}
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
