import axios from "axios";

const BACKEND_URL = "https://fyp-food-f05e3-default-rtdb.firebaseio.com/";

export async function storeData(entryData) {
  const response = await axios.post(BACKEND_URL + "entry.json", entryData);
  const id = response.data.name;
  return id;
}

export async function fetchData() {
  const response = await axios.get(BACKEND_URL + "entry.json");
  const entries = response.data
    ? Object.entries(response.data).map(
        ([
          key,
          { description, carbohydrates, fat, protein, weight, date },
        ]) => ({
          id: key,
          description,
          carbohydrates,
          fat,
          protein,
          weight,
          date: new Date(date),
        })
      )
    : [];
  return entries;
}

export function updateEntry(id, entryData) {
  return axios.put(BACKEND_URL + `entry/${id}.json`, entryData);
}

export function deleteEntry(id) {
  return axios.delete(BACKEND_URL + `entry/${id}.json`);
}

export async function storeFood(foodData) {
  const response = await axios.post(BACKEND_URL + "food.json", foodData);
  const id = response.data.name;
  return id;
}

export async function fetchFood() {
  const response = await axios.get(BACKEND_URL + "food.json");
  const food = response.data
    ? Object.entries(response.data).map(
        ([
          key,
          {
            description,
            nutrients: { carbohydrates, fat, protein },
          },
        ]) => ({
          id: key,
          description,
          nutrients: { carbohydrates, fat, protein },
        })
      )
    : [];
  return food;
}

export function updateFood(id, foodData) {
  return axios.put(BACKEND_URL + `food/${id}.json`, foodData);
}

export function deleteFood(id) {
  return axios.delete(BACKEND_URL + `food/${id}.json`);
}

export async function fetchTdee() {
  const response = await axios.get(BACKEND_URL + "tdee.json");
  const food = response.data
  return food;
}
