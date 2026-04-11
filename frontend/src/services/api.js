const getToken = () => localStorage.getItem("token");
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL}/api${cleanEndpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
    return;
  }

  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Server did not return JSON. Check backend routes.");
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.err || data.error || "Request failed");
  return data;
};
