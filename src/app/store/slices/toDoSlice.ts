import { ToDo } from "@/app/components/InputCard";
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState: any = {
  todos: [
    {
      id: "1",
      text: "Input Text",
      hr: "",
      min: "",
      isCompleted: false,
    },
  ],
};

export const toDoSlice: any = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload.text,
        hr: action.payload.hr,
        min: action.payload.min,
        isCompleted: action.payload.isCompleted,
      };
      state.todos.push(todo);
    },
    removeToDo: (state, action) => {
      state.todos = state.todos.filter(
        (todo: any) => todo.id !== action.payload
      );
    },
    updateToDo: (state, action) => {
      state.todos.forEach((todo: ToDo) => {
        if (todo.id == action.payload.id) {
          todo.text = action.payload.UpdateText;
          todo.hr = action.payload.UpdateHr;
          todo.isCompleted = action.payload.isCompleted;
          todo.min = action.payload.UpdateMin;
        }
      });
    },
  },
});

export default toDoSlice.reducer;
export const { addToDo, removeToDo, updateToDo } = toDoSlice.actions;
