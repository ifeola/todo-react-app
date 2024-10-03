import { createContext } from "react";

export const TodosContext = createContext([
  { title: "", id: "", isCompleted: false },
]);

export const todos = {
  todos: [
    { title: "Hello", id: 123444, isCompleted: false, time: "" },
    { title: "World", id: 123445, isCompleted: false, time: "" },
  ],
  isModalOpen: false,
  textContent: "",
};
