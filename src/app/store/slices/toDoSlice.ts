import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: "1",
      text: "Input Text",
      hr: "0",
      min: "0",
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
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export default toDoSlice.reducer;
export const { addToDo, removeToDo } = toDoSlice.actions;
