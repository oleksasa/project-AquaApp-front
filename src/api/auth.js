import { instance } from "../axios.js";

export const registerUser = async (userInfo) => {
  const data = await instance.post("/auth/register", userInfo);
  return data;
};

export const logInUser = async (userInfo) => {
  const data = await instance.post("/auth/login", userInfo);
  return data;
};

export const logOutUser = async () => {
  await instance.post("/auth/logout");
};

export const requestRefreshUser = async () => {
  const data = await instance.post("/auth/refresh");
  return data;
};

export const requestUserInfo = async () => {
  const data = await instance.get("/account");
  return data;
};

export const updateUserInfo = async (userInfo) => {
  const data = await instance.patch("/account", userInfo);
  return data;
};

// export const updateUserPhoto = async (formData) => {
//   const data = await instance.patch("/users/photo", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return data;
// };

export const requestUserCount = async () => {
  const data = await instance.get("/users");
  return data;
};
