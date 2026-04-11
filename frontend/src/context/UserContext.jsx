import { createContext, useState } from "react";

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("token");
      return null;
    }

    return payload.payload || payload;
  } catch (error) {
    console.error("Failed to parse token:", error);
    localStorage.removeItem("token");
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromToken());

  const value = {
    user,
    setUser,
    logout: () => {
      localStorage.removeItem("token");
      setUser(null);
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext };
