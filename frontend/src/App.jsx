import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AllDebtsPage from "./pages/AllDebtsPage";
import AddDebtsPage from "./pages/AddDebtsPage";
import InsightsPage from "./pages/InsightsPage";
import AccountPage from "./pages/AccountPage";

const App = () => {
  const isLoggedIn = true;

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoggedIn && <NavBar onLogout={handleLogout} />}

      <main className={isLoggedIn ? "pt-14 pb-16" : ""}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={isLoggedIn ? <DashboardPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/debts"
            element={isLoggedIn ? <AllDebtsPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/debts/new"
            element={isLoggedIn ? <AddDebtsPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/insights"
            element={isLoggedIn ? <InsightsPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/account"
            element={isLoggedIn ? <AccountPage /> : <Navigate to="/auth" />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
