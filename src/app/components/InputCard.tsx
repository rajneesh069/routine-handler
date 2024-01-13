"use client";
import { HStack, Input, Text } from "@chakra-ui/react";
import { Card, CardBody, CardFooter, Button } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../store/slices/toDoSlice";
export default function InputCard() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [hr, setHr] = useState("");
  const [min, setMin] = useState("");
  function handleSubmit(event: any) {
    event.preventDefault();
    dispatch(addToDo({ text, hr, min, date: new Date() }));
    setText("");
    setHr("");
    setMin("");
  }
  return (
    <Card background={"#eee"} border={"1px solid black"} maxWidth={"270px"}>
      <CardBody>
        <form>
          <Input
            background={"white"}
            marginTop={"2%"}
            marginBottom={"2%"}
            placeholder="Title"
            variant={"filled"}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          Time(24 hrs) :
          <HStack marginTop={"2%"}>
            <NumberInput
              value={hr}
              border={"1px solid black"}
              borderRadius={"10"}
              min={0}
              max={24}
              background={"white"}
            >
              <NumberInputField
                value={hr}
                onChange={(event) => {
                  setHr(event.target.value);
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text>Hrs</Text>
            <NumberInput
              value={min}
              border={"1px solid black"}
              borderRadius={"10"}
              min={0}
              max={59}
              background={"white"}
            >
              <NumberInputField
                value={min}
                onChange={(event) => {
                  setMin(event.target.value);
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text>Mins</Text>
          </HStack>
        </form>
      </CardBody>
      <CardFooter>
        <Button
          background={"white"}
          type="submit"
          onClick={(event: any) => {
            handleSubmit(event);
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

export type ToDo = {
  id: string;
  text: string;
  hr: string;
  min: string;
  isCompleted: boolean;
};
