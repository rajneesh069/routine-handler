import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState: any = {
  todos: [],
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
      const newArray = state.todos.map((todo: any) => {
        if (todo.id == action.payload.id) {
          todo.text = action.payload.UpdateText;
          todo.hr = action.payload.UpdateHr;
          todo.isCompleted = action.payload.isCompleted;
          todo.min = action.payload.UpdateMin;
          return todo;
        } else {
          return todo;
        }
      });
      state.todos = state.todos.filter((todo: any) => {
        return todo.id !== action.payload.id;
      });
      state.todos.push(...newArray);
    },
  },
});

export default toDoSlice.reducer;
export const { addToDo, removeToDo, updateToDo } = toDoSlice.actions;
