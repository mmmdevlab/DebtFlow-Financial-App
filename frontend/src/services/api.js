const getToken = () => localStorage.getItem("token");
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}/api${cleanEndpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      console.error(`Invalid Content-Type at ${endpoint}:`, contentType);
      throw new Error("Server did not return JSON. Check backend routes.");
    }

    const data = await res.json();
    if (!res.ok) {
      console.error(`API Error [${res.status}] at ${endpoint}:`, data.error);
      throw new Error(data.error || "Request failed");
    }

    return data;
  } catch (err) {
    console.error(`Fetch Failure at ${endpoint}:`, err.message);
    throw err;
  }
};
