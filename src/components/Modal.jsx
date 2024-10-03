import { useContext, useEffect } from "react";
import { TodosContext } from "./TodosContext";

function Modal() {
  const { state, dispatch } = useContext(TodosContext);

  function closeModal() {
    dispatch({ type: "CLOSE_MODAL", payload: false });
  }

  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 2000);
  });

  return <div className="modal">{state.textContent}</div>;
}

export default Modal;
