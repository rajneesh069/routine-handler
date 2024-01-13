"use client";
import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { ToDo } from "./InputCard";
import { useDispatch } from "react-redux";
import { addToDo, removeToDo } from "../store/slices/toDoSlice";
import { useEffect, useState } from "react";

export default function ReminderCard({ text, hr, isCompleted, min, id }: ToDo) {
  let time1: any;
  const hrs = Number(hr);
  const mins = Number(min);
  if (0 <= hrs && hrs < 10) {
    if (mins >= 0 && mins < 10) {
      time1 = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        hrs,
        mins,
        0
      );
    } else {
      time1 = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        hrs,
        mins,
        0
      );
    }
  } else {
    if (mins >= 0 && mins < 10) {
      time1 = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        hrs,
        mins,
        0
      );
    } else {
      time1 = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        hrs,
        mins,
        0
      );
    }
  }
  const dispatch = useDispatch();
  const [time, setTime] = useState(currentTimeAsString());
  function timeSetter() {
    setTime(currentTimeAsString());
  }

  useEffect(() => {
    setInterval(timeSetter, 1000);
    if (
      currentTimeInMS() - time1.getTime() <= 1000 &&
      currentTimeInMS() - time1.getTime() >= 0
    ) {
      dispatch(removeToDo(id));
      dispatch(addToDo({ text, hr, min, isCompleted: true, id }));
      alert(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimeInMS()]);
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <Card background={"#eee"}>
        <CardHeader>
          <Heading textDecoration={isCompleted ? "line-through" : ""} size="md">
            {text}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text textDecoration={isCompleted ? "line-through" : ""}></Text>
          <Text
            textDecoration={isCompleted ? "line-through" : ""}
            marginTop={"0.25%"}
          >
            Time : {hrs < 10 ? "0" + hrs : hrs}:{mins < 10 ? "0" + mins : mins}
          </Text>
        </CardBody>
        <CardFooter>
          <Button
            background={"white"}
            onClick={() => {
              dispatch(removeToDo(id));
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}

function currentTimeInMS() {
  const date = new Date();

  const currentTimeInMS = date.getTime();
  return currentTimeInMS;
}

function currentTimeAsString() {
  const date = new Date();
  const currentTimeAsString = date.toLocaleTimeString();
  return currentTimeAsString;
}
