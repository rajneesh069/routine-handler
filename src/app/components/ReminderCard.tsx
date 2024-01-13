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
  Input,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from "@chakra-ui/react";
import { ToDo } from "./InputCard";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, removeToDo, updateToDo } from "../store/slices/toDoSlice";
import { useEffect, useState } from "react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
export default function ReminderCard({ text, hr, isCompleted, min, id }: ToDo) {
  const todos = useSelector((state: { todos: ToDo[] }) => state.todos);
  const requiredToDo: ToDo | undefined = todos.find((todo) => {
    return todo.id == id;
  });
  const [UpdateText, setUpdateText] = useState(requiredToDo?.text);
  const [UpdateHr, setUpdateHr] = useState(requiredToDo?.hr);
  const [UpdateMin, setUpdateMin] = useState(requiredToDo?.min);
  const isError = {
    isUpdateTextError: UpdateText === "",
    isUpdateMinError: String(UpdateHr) === "",
    isUpdateHrError: String(UpdateMin) === "",
  };
  function handleUpdateSubmit(event: any) {
    event.preventDefault();
    dispatch(
      updateToDo({ UpdateText, UpdateHr, UpdateMin, isCompleted: false, id })
    );
    setUpdateText("");
    setUpdateHr("");
    setUpdateMin("");
  }
  const [isUpdated, setIsUpdated] = useState(false);
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

  return !isUpdated ? (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <Card background={"#eee"} maxHeight={"200px"} border={"1px solid blue"}>
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
          &nbsp;
          <Button
            background={"white"}
            onClick={() => {
              setIsUpdated(!isUpdated);
            }}
          >
            Edit
          </Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  ) : (
    <Card background={"#eee"} maxWidth={"270px"} border={"2px solid green"}>
      <CardBody>
        <form>
          <FormControl isRequired isInvalid={isError.isUpdateTextError}>
            <Input
              autoComplete="off"
              background={"white"}
              marginTop={"2%"}
              placeholder="Title"
              variant={"filled"}
              value={UpdateText}
              onChange={(event) => {
                setUpdateText(event.target.value);
              }}
            />
            {!isError.isUpdateTextError ? (
              ""
            ) : (
              <FormErrorMessage>ToDo is required.</FormErrorMessage>
            )}
          </FormControl>
          <Text>Time(24 hrs) :</Text>
          <HStack marginTop={"2%"}>
            <FormControl isInvalid={isError.isUpdateHrError} isRequired>
              <FormLabel>Hours</FormLabel>
              <NumberInput
                value={UpdateHr}
                border={"1px solid black"}
                borderRadius={"10"}
                min={0}
                max={23}
                background={"white"}
              >
                <NumberInputField
                  autoComplete="off"
                  value={UpdateHr}
                  onChange={(event) => {
                    setUpdateHr(event.target.value);
                  }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {!isError.isUpdateHrError ? (
                ""
              ) : (
                <FormErrorMessage>Hours required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isError.isUpdateMinError} isRequired>
              <FormLabel>Minutes</FormLabel>
              <NumberInput
                value={UpdateMin}
                border={"1px solid black"}
                borderRadius={"10"}
                min={0}
                max={59}
                background={"white"}
              >
                <NumberInputField
                  autoComplete="off"
                  value={UpdateMin}
                  onChange={(event) => {
                    setUpdateMin(event.target.value);
                  }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {!isError.isUpdateMinError ? (
                ""
              ) : (
                <FormErrorMessage>Minutes required.</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        </form>
      </CardBody>
      <CardFooter>
        <Button
          background={"white"}
          type="submit"
          onClick={(event: any) => {
            if (
              !isError.isUpdateHrError &&
              !isError.isUpdateTextError &&
              !isError.isUpdateMinError
            ) {
              handleUpdateSubmit(event);
            }
            setIsUpdated(!isUpdated);
          }}
        >
          Update
        </Button>
      </CardFooter>
    </Card>
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
