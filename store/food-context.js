import { createContext, useReducer } from "react";

export const FoodContext = createContext({
  food: [],
  addFood: ({ description, nutrients: { carbohydrates, fat, protein } }) => {},
  setFood: (food) => {},
  deleteFood: (id) => {},
  updateFood: (
    id,
    { description, nutrients: { carbohydrates, fat, protein } }
  ) => {},
});

function foodReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "DELETE":
      return state.filter((food) => food.id !== action.payload);
    case "UPDATE":      
      const idx = state.findIndex((food) => food.id === action.payload.id);
      const updatedFood = { ...state[idx], ...action.payload.data };
      const updatedFoodArray = [...state];
      updatedFoodArray[idx] = updatedFood;
      return updatedFoodArray;
    default:
      return state;
  }
}

// function createFood(
//   description = "Name",
//   carbohydrates = 0,
//   fat = 0,
//   protein = 0
// ) {
//   return {
//     id: Math.random().toString(),
//     description,
//     nutrients: {
//       carbohydrates,
//       fat,
//       protein,
//     },
//   };
// }

// const DUMMY_DATA = [
//   createFood("Almond butter", 21.2, 53, 20.8),
//   createFood("Almond milk", 0.67, 1.56, 0.66),
//   createFood("Apple juice", 11.4, 0.29, 0.09),
//   createFood("Avocado", 8.32, 20.3, 1.81),
//   createFood("Bananas", 20.1, 0.22, 0.73),
//   createFood("Beef", 0, 17.8, 18.4),
//   createFood("Egg", 0.96, 9.96, 12.4),
//   createFood("Rice, white, uncooked", 80.3, 1.03, 7.04),
//   createFood("Rice, white, cooked", 44, 0.44, 4.2),
// ];

export default function FoodContextProvider({ children }) {
  const [foodState, dispatch] = useReducer(foodReducer, []);

  function addFood(food) {
    dispatch({ type: "ADD", payload: food });
  }
  function setFood(food) {
    dispatch({ type: "SET", payload: food });
  }
  function deleteFood(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateFood(id, food) {
    dispatch({ type: "UPDATE", payload: { id, data: food } });
  }

  const value = {
    food: foodState,
    addFood,
    setFood,
    deleteFood,
    updateFood,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}
