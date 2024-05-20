import { editToDo, todoState } from "@/lib/features/todoSlice";
import { useAppDispatch } from "@/lib/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Flex,
  Stack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function EditTodo({
  id,
  todo,
}: {
  id: number;
  todo: todoState;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<todoState>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const onSubmit = (data: todoState) => {
    data.hrs = Math.floor(Number(data.hrs));
    data.mins = Math.floor(Number(data.mins));

    dispatch(
      editToDo({
        newTodo: data,
        id,
        isCompleted: false,
      })
    );
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Edit
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>
              <Flex
                gap={{ base: 2, md: 3 }}
                flexDirection={{ base: "column", md: "row" }}
              >
                <Stack>
                  <Input
                    type="number"
                    defaultValue={
                      Number(todo.hrs) < 10 ? `0${todo.hrs}` : todo.hrs
                    }
                    placeholder="Hours"
                    {...register("hrs", {
                      required: "Hours can't be empty.",
                      validate: (value) => {
                        value = Number(value);
                        if (!isNaN(value) && value >= 0 && value <= 24) {
                          return true;
                        }
                        return "Please enter valid hours.";
                      },
                    })}
                  />
                  <Text fontSize={15} color={"red"}>
                    {errors.hrs?.message}
                  </Text>
                </Stack>
                <Stack>
                  <Input
                    type="number"
                    defaultValue={
                      Number(todo.mins) < 10 ? `0${todo.mins}` : todo.mins
                    }
                    placeholder="Minutes"
                    {...register("mins", {
                      required: "Minutes can't be empty.",
                      validate: (value) => {
                        value = Number(value);
                        if (!isNaN(value) && value >= 0 && value <= 59) {
                          return true;
                        }
                        return "Please enter valid minutes.";
                      },
                    })}
                  />
                  <Text fontSize={15} color={"red"}>
                    {errors.mins?.message}
                  </Text>
                </Stack>
              </Flex>
            </ModalHeader>
            <ModalBody>
              <Stack>
                <Stack>
                  <Input
                    type="text"
                    defaultValue={todo.title}
                    id="title"
                    placeholder="Title"
                    {...register("title", {
                      required: "Title can't be empty.",
                    })}
                  />
                  <Text
                    marginLeft={"1%"}
                    color={"red"}
                    fontWeight={600}
                    fontSize={15}
                  >
                    {errors.title?.message}
                  </Text>
                </Stack>
                <Spacer />
                <Stack>
                  <Input
                    type="text"
                    defaultValue={todo.description}
                    placeholder="Description"
                    {...register("description")}
                  />
                  <Text color={"red"}>{errors.description?.message}</Text>
                </Stack>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  getValues("hrs") &&
                    getValues("mins") &&
                    getValues("title") &&
                    onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="green"
                onClick={() => {
                  getValues("hrs") &&
                    getValues("mins") &&
                    getValues("title") &&
                    onClose();
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
