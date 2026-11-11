
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const adminPage = location.pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2 rounded-xl">
            <GraduationCap size={25} />
          </div>

          <div>
            <h1 className="font-bold text-xl">
              School<span className="text-indigo-600">Desk</span>
            </h1>
            <p className="text-xs text-slate-500">
              Homework Portal
            </p>
          </div>
        </Link>

        {adminPage ? (
          <Link
            to="/"
            className="text-indigo-600 font-semibold text-sm"
          >
            Student Portal
          </Link>
        ) : (
          <Link
            to="/admin/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm"
          >
            <LayoutDashboard size={17} />
            Teacher Login
          </Link>
        )}
      </nav>
    </header>
  );
}
