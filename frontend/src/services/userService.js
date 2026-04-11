import apiFetch from "./api";

export const getUserProfile = async () => {
  return await apiFetch("/users/profile");
};
