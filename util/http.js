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
