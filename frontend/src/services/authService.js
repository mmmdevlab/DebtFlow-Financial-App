const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const handleAuthRequest = async (endpoint, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err || data.error) {
      throw new Error(data.err || data.error);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (error) {
    console.error(`Auth Error (${endpoint}):`, error);
    throw error;
  }
};

const signUp = (formData) => handleAuthRequest("signup", formData);
const logIn = (formData) => handleAuthRequest("login", formData);

export { signUp, logIn };
