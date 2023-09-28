import axios from "axios";

const API_KEY = "a17b38cf3321f72ce76dd08aa4f001f1";
const API_URL = "https://api.openweathermap.org/data/2.5/find";

export const fetchCities = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: query,
        type: "like",
        sort: "population",
        cnt: 10,
        appid: API_KEY,
      },
    });
    return response.data.list.map((city) => city.name);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
