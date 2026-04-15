import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  Plus,
  BarChart2,
  User,
  LogOut,
} from "lucide-react";
import { UserContext } from "../../context/UserContext";
import ActionButton from "../UI/ActionButton";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={22} /> },
  { to: "/all-debts", label: "Debts", icon: <List size={22} /> },
  { to: "/log-entries", label: "Add", icon: <Plus size={22} /> },
  { to: "/insights", label: "Insights", icon: <BarChart2 size={22} /> },
  { to: "/account", label: "Account", icon: <User size={22} /> },
];

const NavBar = ({ isLoggedIn }) => {
  const { user, logout } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <>
      <header className="navbar-top flex items-center justify-between px-6 h-14 bg-white border-b border-gray-100 sticky top-0 z-50">
        <Link to={user ? "/dashboard" : "/auth/login"}>
          <img src="/Logo_h.svg" alt="DebtFlow logo" className="h-7" />
        </Link>

        {user && (
          <ActionButton variant="danger" onClick={handleLogout}>
            <LogOut size={14} />
            Logout
          </ActionButton>
        )}
      </header>

      {isLoggedIn && (
        <nav className="navbar-bottom fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
          <ul className="flex items-center justify-around h-16">
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/dashboard"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-col items-center gap-1 text-green-600 px-2"
                      : "flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 px-2"
                  }
                >
                  {icon}
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
