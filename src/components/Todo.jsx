import React, { useContext, useState } from "react";
import { Edit, Remove } from "./SVGs";
import { TodosContext } from "./TodosContext";

function Todo({ title, id, checked, time }) {
  const { dispatch } = useContext(TodosContext);
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  function handleChange(e) {
    setNewTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "EDIT_TODO", payload: { id, title: newTitle } });
    setEdit((prevState) => !prevState);
  }

  return (
    <>
      <div className="todo__content">
        <div className="todo__title">
          <input
            type="checkbox"
            name="check__todo"
            id="check__todo"
            checked={checked}
            onChange={(e) => {
              if (e.target.checked) {
                dispatch({
                  type: "COMPLETED",
                  payload: { title, id, isCompleted: true },
                });
              } else {
                dispatch({
                  type: "NOT_COMPLETED",
                  payload: { title, id, isCompleted: false },
                });
              }
            }}
          />
          <h3>{title}</h3>
        </div>
        <div className="todo__btns">
          <button
            className="edit"
            onClick={() => {
              setEdit((prevState) => !prevState);
            }}>
            {Edit}
          </button>
          <button
            className="remove"
            onClick={() => {
              dispatch({ type: "DELETE_TODO", payload: id });
            }}>
            {Remove}
          </button>
        </div>
      </div>
      {edit && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="edit"
            className="edit__todo"
            value={newTitle}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default Todo;
