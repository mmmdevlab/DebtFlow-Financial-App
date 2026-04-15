import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { logIn } from "../../services/authService";

import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("login submitted");
    setMessage("");

    try {
      const userPayload = await logIn(formData);
      setUser(userPayload);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <main>
      {message && (
        <p className="text-red-500 bg-red-50 p-2 rounded">{message}</p>
      )}
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-5"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Welcome back!
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Log in to your DebtFlow account
          </p>
        </div>

        <label htmlFor="username" className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Username
          </span>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
            placeholder="Type your username"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <label htmlFor="password" className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Password
          </span>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
            placeholder="Type your password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-full font-bold text-sm hover:bg-green-600 transition mt-2"
        >
          Log in
        </button>
      </form>
    </main>
  );
};

export default LoginForm;
