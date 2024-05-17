import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type subtask = {
  id: number;
  taskName: string;
  taskCategory: string;
  startingTime: string;
  endingTime: string;
  hours: number;
  minutes: number;
  seconds: number;
};

export type task = {
  id: number;
  subtasks: subtask[];
  date: string;
};

type taskState = {
  tasks: task[];
};

const initialState: taskState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<task>) {
      state.tasks.unshift(action.payload);
    },
    removeEntry(state) {
      state.tasks.shift();
    },
    updateEntry(state, action: PayloadAction<subtask>) {
      state.tasks[0].subtasks.unshift(action.payload);
    },
    setTasksFetchedFromBackend(state, action: PayloadAction<task[]>) {
      state.tasks = action.payload;
    },
    deleteEntry(
      state,
      action: PayloadAction<{ index: number; subtaskIndex: number }>
    ) {
      if (state.tasks[action.payload?.index].subtasks.length === 1) {
        state.tasks.splice(action.payload?.index, 1);
      } else {
        state.tasks[action.payload?.index].subtasks.splice(
          action.payload.subtaskIndex,
          1
        );
      }
    },

    // addTask(state, action: PayloadAction<task>) {
    //   state.tasks.unshift(action.payload);
    // },
  },
});

export const tasksActions = tasksSlice.actions;
