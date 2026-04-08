const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Welcome back!</h1>
        <p className="text-sm text-gray-400 mt-1">
          Log in to your DebtFlow account
        </p>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
          Email
        </span>
        <input
          type="email"
          placeholder="Type your email address"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
          Password
        </span>
        <input
          type="password"
          placeholder="Type your password"
          required
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
  );
};

export default LoginForm;
