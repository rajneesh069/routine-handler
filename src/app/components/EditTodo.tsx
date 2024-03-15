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
    reset,
    formState: { errors },
  } = useForm<todoState>({
    defaultValues: {
      title: todo.title,
      description: todo.description,
      hrs: todo.hrs,
      mins: todo.mins,
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const onSubmit = (data: todoState) => {
    data.hrs = Number(data.hrs);
    data.mins = Number(data.mins);
    const inputTimeInMS: number =
      Number(todo.hrs) * 60 * 60 * 1000 + Number(todo.mins) * 60 * 1000;

    const currentTimeInMS: number =
      new Date().getHours() * 60 * 60 * 1000 +
      new Date().getMinutes() * 60 * 1000 +
      new Date().getSeconds() * 1000;
    const timeoutInMS = inputTimeInMS - currentTimeInMS;

    dispatch(
      editToDo({
        newTodo: data,
        id,
        isCompleted: timeoutInMS > 0 ? false : true,
      })
    );
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Edit
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      >
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
                    placeholder="Hours"
                    {...register("hrs", {
                      required: "Hours can't be empty.",
                      validate: (value) => {
                        if (!isNaN(value) && value >= 0 && value <= 24)
                          return true;
                        return "Please enter valid hours.";
                      },
                    })}
                  />
                  <Text color={"red"}>{errors.hrs?.message}</Text>
                </Stack>
                <Stack>
                  <Input
                    placeholder="Minutes"
                    {...register("mins", {
                      required: "Minutes can't be empty.",
                      validate: (value) => {
                        if (!isNaN(value) && value >= 0 && value <= 59)
                          return true;
                        return "Please enter valid minutes.";
                      },
                    })}
                  />
                  <Text color={"red"}>{errors.mins?.message}</Text>
                </Stack>
              </Flex>
            </ModalHeader>
            <ModalBody>
              <Stack>
                <Stack>
                  <Input
                    id="title"
                    placeholder="Title"
                    {...register("title", {
                      required: "Title can't be empty.",
                    })}
                  />
                  <Text color={"red"}>{errors.title?.message}</Text>
                </Stack>
                <Spacer />
                <Stack>
                  <Input
                    placeholder="Description"
                    {...register("description", {
                      required: "Description can't be empty.",
                    })}
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
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="green"
                onClick={() => {
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
