import { createContext, useReducer } from "react";
import { EntriesContext } from "./entries-context";

export const tdeeContext = createContext({
  tdee: 0.0,
  setTdee: (tdee) => {},
  updateTdee: (id, { tdee }) => {},
});

function tdeeReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "UPDATE":
      return action.payload.data;
    default:
      return state;
  }
}

const DUMMY_TDEE = 0;

export default function TdeeProvider({ children }) {
  const [tdeeState, dispatch] = useReducer(tdeeReducer, DUMMY_TDEE);

  function setTdee(tdee) {
    dispatch({ type: "SET", payload: tdee });
  }

  function updateTdee(id, tdee) {
    dispatch({ type: "SET", payload: { id, data: tdee } });
  }

  const value = {
    tdee: tdeeState,
    setTdee,
    updateTdee,
  };

  return (
    <EntriesContext.Provider value={value}>{children}</EntriesContext.Provider>
  )
}
