import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getUserProfile } from "../services/userService";
import ActionButton from "../components/UI/ActionButton";
import { Trash2 } from "lucide-react";

const AccountPage = () => {
  const { user: authUser, logout } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) fetchProfile();
  }, [authUser]);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This will also delete all your debts and payment history. This action cannot be undone.",
    );

    if (confirmDelete) {
      try {
        // TODO: await deleteUser(profile._id);
        alert("Account deleted successfully.");
        logout();
      } catch (error) {
        console.error("Failed to delete account", error);
      }
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (!profile)
    return (
      <p className="text-center mt-10 text-red-500">Could not find profile.</p>
    );

  const initials = profile.username?.slice(0, 2).toUpperCase() || "??";

  const accountRows = [
    { label: "Username", value: profile.username },
    { label: "Email", value: profile.email },
  ];

  return (
    <div className="flex items-start justify-center p-6 min-h-screen">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-4 px-6 py-6 border-b border-gray-100">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0 border border-blue-100">
            {initials}
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">
              {profile.username}
            </p>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              {profile.accountType} Account
            </p>
          </div>
        </div>

        <div className="px-6 py-2">
          {accountRows.map((row, i, arr) => (
            <div
              key={row.label}
              className={`flex justify-between items-center py-4 ${
                i < arr.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                {row.label}
              </span>
              <span
                className={`text-sm font-medium ${
                  row.muted ? "text-gray-300 tracking-widest" : "text-gray-700"
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="px-6 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-center">
          <ActionButton
            onClick={handleDeleteAccount}
            variant="danger"
            className="flex-1 py-3 text-white rounded-full text-sm font-bold"
          >
            <Trash2 size={16} />
            Delete Account
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
