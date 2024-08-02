import { instance } from "../axios.js";

export const registerUser = async (userInfo) => {
  const data = await instance.post("/users/register", userInfo);
  return data;
};

export const logInUser = async (userInfo) => {
  const data = await instance.post("/users/login", userInfo);
  return data;
};

export const logOutUser = async () => {
  await instance.post("/users/logOut");
};

export const requestRefreshUser = async () => {
  const data = await instance.post("/users/refresh");
  return data;
};

export const requestUserInfo = async () => {
  const data = await instance.get("/users/info");
  return data;
};

export const updateUserInfo = async (userInfo) => {
  const data = await instance.patch("/users/info", userInfo);
  return data;
};

export const updateUserPhoto = async (formData) => {
  const data = await instance.patch("/users/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const requestUserCount = async () => {
  const data = await instance.get("/users/count");
  return data;
};
