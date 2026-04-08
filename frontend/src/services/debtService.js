const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/debts`;

const getToken = () => localStorage.getItem("token");

export const getAllDebts = async () => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch debts");
  return data;
};
