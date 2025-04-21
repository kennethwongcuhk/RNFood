import { createContext, useReducer } from "react";


export const TdeeContext = createContext({
  tdee: 0,
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

export default function TdeeContextProvider({ children }) {
  const [tdeeState, dispatch] = useReducer(tdeeReducer, 0);

  function setTdee(tdee) {
 
    dispatch({ type: "SET", payload: tdee });
  }

  function updateTdee(id, tdee) {
    dispatch({ type: "UPDATE", payload: { id, data: tdee } });
  }

  const value = {
    tdee: tdeeState,
    setTdee,
    updateTdee,
  };

  return (
    <TdeeContext.Provider value={value}>{children}</TdeeContext.Provider>
  )
}
