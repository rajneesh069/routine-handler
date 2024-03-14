"use client";
import { addToDo, todoState } from "@/lib/features/todoSlice";
import { useAppDispatch } from "@/lib/hooks";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Input,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const ReminderCard = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<todoState>();

  const onSubmit = (todo: todoState) => {
    dispatch(addToDo(todo));
    reset();
  };
  return (
    <Card width={{ md: "23%", base: "100%" }} minHeight={200}>
      <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CardBody>
          <Stack>
            <Flex
              gap={{ base: 2, md: 3 }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Stack>
                <Input
                  placeholder="Hours"
                  type="number"
                  {...register("hrs", {
                    required: true,
                    validate: (value) => {
                      if (!isNaN(value) && value >= 0 && value < 24)
                        return true;
                      return "Please enter valid hours.";
                    },
                  })}
                />
                {errors.hrs && <Text color={"red"}>{errors.hrs.message}</Text>}
              </Stack>
              <Stack>
                <Input
                  placeholder="Minutes"
                  type="number"
                  {...register("mins", {
                    required: true,
                    validate: (value) => {
                      if (!isNaN(value) && value >= 0 && value <= 59)
                        return true;
                      return "Please enter valid minutes.";
                    },
                  })}
                />
                {errors.mins && (
                  <Text color={"red"}>{errors.mins.message}</Text>
                )}
              </Stack>
            </Flex>
            <Stack>
              <Input
                id="title"
                placeholder="Title"
                {...register("title", {
                  required: true,
                })}
              />
              {errors.title && (
                <Text color={"red"}>{errors.title.message}</Text>
              )}
            </Stack>
            <Spacer />
            <Stack>
              <Input placeholder="Description" {...register("description")} />
              {errors.description && (
                <Text color={"red"}>{errors.description.message}</Text>
              )}
            </Stack>
          </Stack>
        </CardBody>
        <CardFooter display={"flex"} justify={"end"}>
          <Button colorScheme={"blue"} type="submit">
            Add Todo
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ReminderCard;
