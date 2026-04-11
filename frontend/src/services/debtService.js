import { apiFetch } from "./api";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/debts`;

export const getAllDebts = async () => {
  return apiFetch(BASE_URL);
};

export const createDebt = async (debtData) => {
  return apiFetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(debtData),
  });
};

export const updateDebt = async (id, debtData) => {
  return apiFetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(debtData),
  });
};

export const deleteDebt = async (id) => {
  return apiFetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
