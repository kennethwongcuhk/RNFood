import { createContext, useReducer } from "react";

export const EntriesContext = createContext({
  entries: [],
  addEntry: ({ description, carbohydrates, fat, protein, weight, date }) => {},
  setEntries: (entries) => {},
  deleteEntry: (id) => {},
  updateEntry: (
    id,
    { description, carbohydrates, fat, protein, weight, date }
  ) => {},
});

function entriesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "DELETE":
      return state.filter((entry) => entry.id !== action.payload);
    case "UPDATE":
      const idx = state.findIndex((entry) => entry.id === action.payload.id);
      const updatedEntry = { ...state[idx], ...action.payload.data };
      const updatedEntries = [...state];
      updatedEntries[idx] = updatedEntry;
      return updatedEntries;
    default:
      return state;
  }
}

const DUMMY_DATA = [
  {
    id: 1,
    description: "DUMMY DATA 1 EGG",
    carbohydrates: 0.77,
    fat: 9.94,
    protein: 12.58,
    weight: 100,
    date: new Date(),
  },
  {
    id: 2,
    description: "DUMMY DATA 2 WHITE RICE",
    carbohydrates: 44.08,
    fat: 0.44,
    protein: 4.2,
    weight: 100,
    date: new Date(),
  },
  {
    id: 3,
    description: "DUMMY DATA 3 CHICKEN BREAST",
    carbohydrates: 0,
    fat: 7.72,
    protein: 29.55,
    weight: 100,
    date: new Date(),
  },
];

export default function EntriesContextProvider({ children }) {
  const [entriesState, dispatch] = useReducer(entriesReducer, []);

  function addEntry(entry) {
    dispatch({ type: "ADD", payload: entry });
  }
  function setEntries(entries) {
    dispatch({ type: "SET", payload: entries });
  }
  function deleteEntry(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateEntry(id, entry) {
    dispatch({ type: "UPDATE", payload: { id, data: entry } });
  }

  const value = {
    entries: entriesState,
    addEntry,
    setEntries,
    deleteEntry,
    updateEntry,
  };

  return (
    <EntriesContext.Provider value={value}>{children}</EntriesContext.Provider>
  );
}
