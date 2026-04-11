import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

import AuthPage from "./pages/AuthPage";
import NavBar from "./components/NavBar/NavBar";
import DashboardPage from "./pages/DashboardPage";
import AllDebtsPage from "./pages/AllDebtsPage";
import LogPage from "./pages/LogPage";
import InsightsPage from "./pages/InsightsPage";
import AccountPage from "./pages/AccountPage";
import LoginForm from "./components/LoginForm/LogInForm";
import SignupForm from "./components/SignUpForm/SignUpForm";

const App = () => {
  const { user } = useContext(UserContext);

  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar isLoggedIn={isLoggedIn} />

      <main className={user ? "pt-14 pb-16" : ""}>
        <Routes>
          {/* open routes */}
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>
          {/* protected routes */}
          <Route
            path="/"
            element={
              <Navigate to={isLoggedIn ? "/dashboard" : "/auth/login"} />
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <DashboardPage /> : <Navigate to="/auth/login" />
            }
          />
          <Route
            path="/all-debts"
            element={
              isLoggedIn ? <AllDebtsPage /> : <Navigate to="/auth/login" />
            }
          />
          <Route
            path="/log-entries"
            element={isLoggedIn ? <LogPage /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/insights"
            element={
              isLoggedIn ? <InsightsPage /> : <Navigate to="/auth/login" />
            }
          />
          <Route
            path="/account"
            element={
              isLoggedIn ? <AccountPage /> : <Navigate to="/auth/login" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
