import { useContext } from "react";
import Todo from "./Todo";
import { TodosContext } from "./TodosContext";
import Modal from "./Modal";

function Todos() {
  const { state, pendingTodos, CompletedTodos } = useContext(TodosContext);

  return (
    <section>
      {state.isModalOpen && <Modal />}
      <ul className="todos">
        <h3>Pending Todos</h3>
        {pendingTodos
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((todo) => {
            return (
              <li key={todo.id} id={todo.id}>
                <Todo
                  title={todo.title}
                  id={todo.id}
                  checked={todo.isCompleted}
                  time={todo.time}
                />
              </li>
            );
          })}
      </ul>
      <ul className="completed__todos">
        <h3>Completed Todos</h3>
        {CompletedTodos.sort((a, b) => a.title.localeCompare(b.title)).map(
          (todo) => {
            return (
              <li
                key={todo.id}
                id={todo.id}
                className={`${todo.isCompleted ? "completed" : ""}`}>
                <Todo
                  title={todo.title}
                  id={todo.id}
                  checked={todo.isCompleted}
                  time={todo.time}
                />
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
}

export default Todos;
