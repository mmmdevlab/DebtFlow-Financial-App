import { apiFetch } from "./api";

export const getAllDebts = async () => {
  return apiFetch("/debts");
};

export const createDebt = async (debtData) => {
  return apiFetch("/debts", {
    method: "POST",
    body: JSON.stringify(debtData),
  });
};

export const updateDebt = async (id, debtData) => {
  return apiFetch(`/debts/${id}`, {
    method: "PUT",
    body: JSON.stringify(debtData),
  });
};

export const deleteDebt = async (id) => {
  return apiFetch(`/debts/${id}`, {
    method: "DELETE",
  });
};
