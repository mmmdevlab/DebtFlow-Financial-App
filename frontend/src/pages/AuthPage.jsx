import { NavLink, Outlet } from "react-router-dom";
import { Eye, CreditCard, TrendDown, BellSimple } from "@phosphor-icons/react";

const benefits = [
  {
    icon: <Eye size={24} weight="bold" />,
    title: "Full Visibility",
    desc: "Track all your debts in one place with a clear view of total exposure.",
  },
  {
    icon: <CreditCard size={24} weight="bold" />,
    title: "Never Miss a Payment",
    desc: "Stay ahead with upcoming due dates and overdue alerts.",
  },
  {
    icon: <TrendDown size={24} weight="bold" />,
    title: "See Real Progress",
    desc: "Visualise how every payment reduces your total debt over time.",
  },
];

const AuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center gap-10">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
        <nav className="flex bg-gray-100 p-1 rounded-full mb-8">
          <NavLink
            to="/auth/signup"
            className={({ isActive }) =>
              `flex-1 text-center py-2 rounded-full font-medium transition-all ${
                isActive
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Signup
          </NavLink>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `flex-1 text-center py-2 rounded-full font-medium transition-all ${
                isActive
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Login
          </NavLink>
        </nav>

        <div className="auth-form-container">
          <Outlet />
        </div>
      </div>
      <div className="w-full px-10 py-10 rounded-xl border border-gray-200 text-sm text-gray-800 max-w-md space-y-6">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Make your debt visible.{" "}
          <span className="text-green-600">Make it manageable.</span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          DebtFlow models your debt as a time-based system — so you always know
          what you owe, what's due next, and how each payment moves you forward.
        </p>

        <div className="space-y-5 py-2">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-5">
              <div className="bg-green-500 text-white p-4 rounded-xl flex-shrink-0">
                {b.icon}
              </div>
              <div>
                <h3 className="font-bold text-green-600">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
