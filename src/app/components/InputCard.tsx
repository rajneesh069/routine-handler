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
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../store/slices/toDoSlice";
export default function InputCard() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [hr, setHr] = useState("");
  const [min, setMin] = useState("");
  const isError = {
    isTextError: text === "",
    isMinError: String(min) === "",
    isHrError: String(hr) === "",
    isHrMaxError: Number(hr) >= 24 || Number(hr) < 0,
    isMinutesMaxError: Number(min) >= 60 || Number(min) < 0,
  };
  function handleSubmit(event: any) {
    event.preventDefault();
    dispatch(addToDo({ text, hr, min, isCompleted: false }));
    setText("");
    setHr("");
    setMin("");
  }
  return (
    <Card background={"#eee"} border={"1px solid black"} maxWidth={"270px"}>
      <CardBody>
        <form>
          <FormControl isRequired isInvalid={isError.isTextError}>
            <Input
              autoComplete="off"
              background={"white"}
              marginTop={"2%"}
              placeholder="Title"
              variant={"filled"}
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
            {!isError.isTextError ? (
              ""
            ) : (
              <FormErrorMessage>ToDo is required.</FormErrorMessage>
            )}
          </FormControl>
          <Text>Time(24 hrs) :</Text>
          <HStack marginTop={"2%"}>
            <FormControl
              isInvalid={isError.isHrError || isError.isHrMaxError}
              isRequired
            >
              <FormLabel>Hours</FormLabel>
              <NumberInput
                value={hr}
                border={"1px solid black"}
                borderRadius={"10"}
                min={0}
                max={23}
                background={"white"}
              >
                <NumberInputField
                  autoComplete="off"
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
              {!isError.isHrError ? (
                ""
              ) : (
                <FormErrorMessage>Hours required.</FormErrorMessage>
              )}
              {!isError.isHrMaxError ? (
                ""
              ) : (
                <FormErrorMessage>Invalid Hours.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={isError.isMinError || isError.isMinutesMaxError}
              isRequired
            >
              <FormLabel>Minutes</FormLabel>
              <NumberInput
                value={min}
                border={"1px solid black"}
                borderRadius={"10"}
                min={0}
                max={59}
                background={"white"}
              >
                <NumberInputField
                  autoComplete="off"
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
              {!isError.isMinError ? (
                ""
              ) : (
                <FormErrorMessage>Minutes required.</FormErrorMessage>
              )}
              {!isError.isMinutesMaxError ? (
                ""
              ) : (
                <FormErrorMessage>Invalid Minutes.</FormErrorMessage>
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
              !isError.isHrError &&
              !isError.isTextError &&
              !isError.isMinError &&
              Number(hr) < 24 &&
              Number(hr) >= 0 &&
              Number(min) >= 0 &&
              Number(min) < 60
            ) {
              handleSubmit(event);
            }
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
