import { apiFetch } from "./api";

export const getUserProfile = async () => {
  return await apiFetch("/users/profile");
};

export const deleteUser = async (id) => {
  return apiFetch(`/users/${id}`, { method: "DELETE" });
};
