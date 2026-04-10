const AccountPage = () => {
  //later need to fetch user data from backend and use that instead of hardcoded data
  const user = {
    username: "JohnDoe",
    hashedPassword: "123",
    email: "JohnDoe@gmail.com",
    accountType: "Personal",
    createdAt: "2024-01-01",
  };
  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-top justify-center p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">{user.username}</p>
            <p className="text-xs text-gray-400">{user.accountType} Account</p>
          </div>
        </div>

        <div className="px-6 py-1">
          {[
            { label: "Username", value: user.username },
            { label: "Email", value: user.email },
            { label: "Password", value: "••••••••", muted: true },
            { label: "Date joined", value: user.createdAt },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={`flex justify-between items-center py-3 ${
                i < arr.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <span className="text-xs text-gray-400 uppercase tracking-[40%] font-medium">
                {row.label}
              </span>
              <span
                className={`text-sm ${row.muted ? "text-gray-400 tracking-widest" : "text-gray-800"}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="px-6 py-5 border-t border-gray-100">
          <button className="w-full py-2.5 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-100 transition">
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccountPage;
