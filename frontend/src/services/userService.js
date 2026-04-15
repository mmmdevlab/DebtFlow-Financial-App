import { apiFetch } from "./api";

export const getUserProfile = async () => {
  return await apiFetch("/users/profile");
};

export const deleteUser = async () => {
  return apiFetch(`/users/me`, { method: "DELETE" });
};
