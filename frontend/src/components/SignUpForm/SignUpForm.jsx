import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { signUp } from "../../services/authService";

import { UserContext } from "../../context/UserContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  // const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const { username, email, password, passwordConf } = formData;

  const handleChange = (evt) => {
    // setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("signup submitted");
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      // setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      {/* <p>{message}</p> */}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Create your account
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Start tracking your debt today
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
            value={username}
            name="username"
            onChange={handleChange}
            placeholder="Type your username"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <label htmlFor="email" className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Email
          </span>
          <input
            type="email"
            autoComplete="off"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="Type your email address"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <label htmlFor="password" className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Password
          </span>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
            placeholder="Type your password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <label htmlFor="confirm" className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Confirm Password
          </span>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
            placeholder="Retype password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <button
          disabled={isFormInvalid()}
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-full font-bold text-sm hover:bg-green-600 transition mt-2"
        >
          Create account
        </button>
      </form>
    </main>
  );
};

export default SignUpForm;
