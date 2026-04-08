import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LogInForm from "./components/LoginForm/LogInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import NavBar from "./components/NavBar/NavBar";

import DashboardPage from "./pages/DashboardPage";
import AllDebtsPage from "./pages/AllDebtsPage";
import LogPage from "./pages/LogPage";
import InsightsPage from "./pages/InsightsPage";
import AccountPage from "./pages/AccountPage";

import LoginForm from "./components/LoginForm/LogInForm";
import SignupForm from "./components/SignUpForm/SignUpForm";

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
          <Route path="/auth" element={<AuthPage />}>
            {" "}
            //parent route
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<LoginForm />} /> // child route
            <Route path="signup" element={<SignupForm />} /> //child route
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <DashboardPage /> : <Navigate to="/auth/login" />
            }
          />
          <Route
            path="/all-debts"
            element={isLoggedIn ? <AllDebtsPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/log-entries"
            element={isLoggedIn ? <LogPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/insights"
            element={isLoggedIn ? <InsightsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/account"
            element={isLoggedIn ? <AccountPage /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
