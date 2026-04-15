const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const handleAuthRequest = async (endpoint, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || "Authentication failed");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server: No token received");
  } catch (error) {
    console.error(`Auth Error (${endpoint}):`, error.message);
    throw error;
  }
};

export const signUp = (formData) => handleAuthRequest("signup", formData);
export const logIn = (formData) => handleAuthRequest("login", formData);
