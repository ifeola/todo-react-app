import { useReducer } from "react";
import Form from "./components/Form";
import Todos from "./components/Todos";
import { todos, TodosContext } from "./components/TodosContext";

function reducer(state, action) {
  if (action.type === "ADD_TODO") {
    const newTodos = [...state.todos, action.payload];
    return {
      todos: newTodos,
      isModalOpen: true,
      textContent: "Todo Added Successfully.",
    };
  }

  if (action.type === "DELETE_TODO") {
    const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
    return {
      todos: [...newTodos],
      isModalOpen: true,
      textContent: "Todo Removed Successfully.",
    };
  }

  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: action.payload,
    };
  }

  if (action.type === "EMPTY_TODO") {
    return {
      ...state,
      isModalOpen: true,
      textContent: "Please add a todo item!",
    };
  }

  if (action.type === "COMPLETED") {
    const remainingTodos = state.todos.filter(
      (todo) => todo.id !== action.payload.id
    );
    const checkedTodo = state.todos.find(
      (todo) => todo.id === action.payload.id
    );
    checkedTodo.isCompleted = action.payload.isCompleted;

    return {
      ...state,
      todos: [...remainingTodos, checkedTodo],
      isModalOpen: true,
      textContent: "Todo Completed.",
    };
  }

  if (action.type === "NOT_COMPLETED") {
    let unCheckedTodo = state.todos.find(
      (todo) => todo.id === action.payload.id
    );
    unCheckedTodo.isCompleted = action.payload.isCompleted;

    const remainingTodos = state.todos.filter(
      (todo) => todo.id !== action.payload.id
    );

    return {
      ...state,
      todos: [...remainingTodos, unCheckedTodo],
      isModalOpen: true,
      textContent: "Todo Not Completed.",
    };
  }

  if (action.type === "EDIT_TODO") {
    const EditedTodo = state.todos.find(
      (todo) => todo.id === action.payload.id
    );
    EditedTodo.title = action.payload.title;

    const remainingTodos = state.todos.filter(
      (todo) => todo.id !== action.payload.id
    );

    return {
      ...state,
      todos: [...remainingTodos, EditedTodo],
      isModalOpen: true,
      textContent: "Todo Edited.",
    };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, todos);
  const pendingTodos = state.todos.filter((todo) => todo.isCompleted === false);
  const CompletedTodos = state.todos.filter(
    (todo) => todo.isCompleted === true
  );

  return (
    <TodosContext.Provider
      value={{ state, dispatch, pendingTodos, CompletedTodos }}>
      <main>
        <h1>Todo App</h1>
        <div className="main">
          <Form />
          <Todos />
        </div>
      </main>
    </TodosContext.Provider>
  );
}

export default App;
