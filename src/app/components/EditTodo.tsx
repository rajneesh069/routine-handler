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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function EditTodo({
  id,
  todo,
}: {
  id: number;
  todo: todoState;
}) {
  const { register, handleSubmit, reset } = useForm<todoState>({
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>
              <Flex
                gap={{ base: 2, md: 3 }}
                flexDirection={{ base: "column", md: "row" }}
              >
                <Input
                  placeholder="Hours"
                  type="number"
                  {...register("hrs", {
                    validate: (value) => {
                      if (!isNaN(value) && value >= 0 && value <= 24)
                        return true;
                      return "Please enter valid hours.";
                    },
                  })}
                />
                <Input
                  placeholder="Minutes"
                  type="number"
                  {...register("mins", {
                    validate: (value) => {
                      if (!isNaN(value) && value >= 0 && value <= 59)
                        return true;
                      return "Please enter valid minutes.";
                    },
                  })}
                />
              </Flex>
            </ModalHeader>
            <ModalBody>
              <Stack>
                <Input id="title" placeholder="Title" {...register("title")} />
                <Spacer />
                <Input placeholder="Description" {...register("description")} />
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
              <Button type="submit" colorScheme="green" onClick={onClose}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
