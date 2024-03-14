import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface todoState {
  hrs: number;
  mins: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

type editToDo = {
  newTodo: todoState;
  id: number;
  isCompleted: boolean;
};

const initialState: todoState[] = [];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDo: (state: todoState[], action: PayloadAction<todoState>) => {
      action.payload.hrs = Number(action.payload.hrs);
      action.payload.mins = Number(action.payload.mins);
      action.payload.isCompleted = false;
      state.push(action.payload);
      return state;
    },
    editToDo: (state: todoState[], action: PayloadAction<editToDo>) => {
      const newState = [...state];
      let todo = newState.find((_, index) => index === action.payload.id);
      if (todo) {
        todo = { ...action.payload.newTodo };
        newState.splice(action.payload.id, 1);
        newState.splice(action.payload.id, 0, todo);
      }
      return newState;
    },
    removeToDo: (state: todoState[], action: PayloadAction<number>) =>
      state.filter((_, index) => {
        return index !== action.payload;
      }),
    completedTodo: (state: todoState[], action: PayloadAction<number>) => {
      return state.map((todo, index) => {
        if (index === action.payload) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
    },
  },
});

export const { addToDo, removeToDo, editToDo, completedTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
