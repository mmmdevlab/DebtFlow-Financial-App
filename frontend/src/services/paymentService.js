import { apiFetch } from "./api";

export const getAllPayments = async () => {
  return apiFetch("/payments");
};

export const createPayment = async (data) => {
  return apiFetch("/payments", { method: "POST", body: JSON.stringify(data) });
};

export const updatePayment = async (id, data) => {
  return apiFetch(`/payments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deletePayment = async (id) => {
  return apiFetch(`/payments/${id}`, { method: "DELETE" });
};
