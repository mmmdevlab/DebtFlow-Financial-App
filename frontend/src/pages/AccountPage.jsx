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
        // add call delete service here
        // await deleteUser(profile._id);
        alert("Account deleted successfully.");
        logout();
      } catch (error) {
        console.error("Failed to delete account", error);
      }
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading account details...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Details</h2>

      <div className="space-y-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500 uppercase font-bold">Username</p>
          <p className="text-lg text-gray-900">{profile?.username}</p>
        </div>

        <div className="border-b pb-2">
          <p className="text-sm text-gray-500 uppercase font-bold">Email</p>
          <p className="text-lg text-gray-900">{profile?.email}</p>
        </div>

        <div className="border-b pb-2">
          <p className="text-sm text-gray-500 uppercase font-bold">
            Account Type
          </p>
          <p className="text-lg text-gray-900 capitalize">
            {profile?.accountType || "Standard User"}
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-end">
        <div>
          <p className="text-xs text-gray-400 italic">
            User ID: {profile?._id}
          </p>
        </div>

        <ActionButton
          onClick={handleDeleteAccount}
          variant="danger"
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete Account
        </ActionButton>
      </div>
    </div>
  );
};

export default AccountPage;
