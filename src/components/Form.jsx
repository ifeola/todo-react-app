import React, { useContext, useState } from "react";
import { TodosContext } from "./TodosContext";

function Form() {
  const { dispatch, pendingTodos, CompletedTodos, state } =
    useContext(TodosContext);
  const [todo, setTodo] = useState({ title: "", id: "", isCompleted: false });

  function handleChange(e) {
    setTodo({
      title: e.target.value,
      id: new Date().getTime().toString(),
      time: new Date().getTime(),
      isCompleted: false,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (todo.title) {
      dispatch({ type: "ADD_TODO", payload: todo });
    } else {
      dispatch({ type: "EMPTY_TODO" });
    }
    setTodo({ title: "", id: "", isCompleted: false, time: "" });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form__field">
          <label htmlFor="todo">Enter Todo</label>
          <input
            type="text"
            id="todo"
            value={todo.title}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Todo</button>
      </form>

      <div className="todo__counts-bg">
        <h4>Todos Count</h4>
        <div className="todo__counts">
          <h5>
            Total Todos: <span>{state.todos.length}</span>
          </h5>
          <h5>
            Pending: <span>{pendingTodos.length}</span>
          </h5>
          <h5>
            Completed: <span>{CompletedTodos.length}</span>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Form;
