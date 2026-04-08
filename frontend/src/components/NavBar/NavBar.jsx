import { NavLink, Link } from "react-router-dom";
import { House, ListDashes, Plus, ChartBar, User } from "@phosphor-icons/react";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <House size={22} /> },
  { to: "/all-debts", label: "Debts", icon: <ListDashes size={22} /> },
  { to: "/log-entries", label: "Add", icon: <Plus size={22} /> },
  { to: "/insights", label: "Insights", icon: <ChartBar size={22} /> },
  { to: "/account", label: "Account", icon: <User size={22} /> },
];

const NavBar = ({ onLogout, isLoggedIn }) => {
  return (
    <>
      <header className="flex items-center justify-between px-6 h-14 bg-white border-b border-gray-100">
        <Link to={isLoggedIn ? "/dashboard" : "/auth/login"}>
          <img src="/Logo_h.svg" alt="DebtFlow" className="h-7" />
        </Link>

        {isLoggedIn && (
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100"
          >
            Logout
          </button>
        )}
      </header>

      {isLoggedIn && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
          <ul className="flex items-center justify-around h-16">
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/dashboard"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-col items-center gap-1 text-green-600"
                      : "flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
                  }
                >
                  {icon}
                  <span className="text-[10px]">{label}</span>
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
