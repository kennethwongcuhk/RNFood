import { createContext, useReducer } from "react";

export const FoodContext = createContext({
  food: [],
  addFood: ({ description, carbohydrates, fat, protein }) => {},
  deleteFood: (id) => {},
});

function foodReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((food) => food.id !== action.payload);
    default:
      return state;
  }
}

const DUMMY_DATA = [
  {
    id: "f1",
    description: "Egg",
    nutrients: {
      carbohydrates: 0.77,
      fat: 9.94,
      protein: 12.58,
    },
  },
  {
    id: "f2",
    description: "White rice",
    nutrients: {
      carbohydrates: 44.08,
      fat: 0.44,
      protein: 4.2,
    },
  },
  {
    id: "f3",
    description: "Chicken breast",
    nutrients: {
      carbohydrates: 0,
      fat: 7.72,
      protein: 29.55,
    },
  },
  {
    id: "f4",
    description: "Salmon",
    nutrients: {
      carbohydrates: 0,
      fat: 5.93,
      protein: 21.62,
    },
  },
  {
    id: "f5",
    description: "Onion",
    nutrients: {
      carbohydrates: 10.11,
      fat: 0.08,
      protein: 0.92,
    },
  },
];

export default function FoodContextProvider({ children }) {
  const [foodState, dispatch] = useReducer(foodReducer, DUMMY_DATA);

  function addFood(food) {
    dispatch({ type: "ADD", payload: food });
  }
  function deleteFood(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    food: foodState,
    addFood,
    deleteFood,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}
