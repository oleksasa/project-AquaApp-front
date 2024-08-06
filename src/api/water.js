import { instance } from "../axios.js";

export const createWater = async (water) => {
  const data = await instance.post("/water", water);
  return data;
};

export const updateWater = async (id, water) => {
  const data = await instance.patch(`/water/${id}`, water);
  return data;
};

export const deleteWater = async (id) => {
  const data = await instance.delete(`/water/${id}`);
  return data;
};

export const getDayWater = async (date) => {
  const { data } = await instance.get(`/water/day`);
  return data;
};

export const getMonthWater = async (date) => {
  const data = await instance.get(`/water/month`);
  return data;
};

// export const getWeekWater = async (date) => {
//   const data = await instance.get(`/water/week/${date}`);
//   return data;
// };
