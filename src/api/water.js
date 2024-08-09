import { instance } from '../axios.js';

export const getDayWater = async date => {
  const data = await instance.get(`/water/day?date=${date}`);
  // console.log(data);
  return data;
};

export const createWater = async water => {
  const data = await instance.post('/water', water);
  return data;
};

export const patchWater = async (id, water) => {
  const data = await instance.patch(`/water/${id}`, water);
  return data;
};

export const clearWater = async id => {
  const data = await instance.delete(`/water/${id}`);
  return data;
};

export const getMonthWater = async date => {
  const data = await instance.get(`/water/month?date=${date}`);
  return data;
};
