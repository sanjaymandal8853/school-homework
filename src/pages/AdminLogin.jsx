
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, LockKeyhole } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("school_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect username or password.");
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white border rounded-3xl p-8 w-full max-w-md shadow-sm">

        <div className="bg-indigo-600 text-white p-4 rounded-2xl w-fit mx-auto">
          <GraduationCap size={30} />
        </div>

        <h2 className="text-2xl font-bold text-center mt-5">
          Teacher Login
        </h2>

        <p className="text-slate-500 text-sm text-center mt-2">
          Login to manage school homework.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Username
            </label>

            <input
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>

            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
            />
          </div>

          {error && (
            <p role="alert" className="text-red-600 text-sm">
              {error}
            </p>
          )}

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 font-semibold">
            <LockKeyhole size={17} className="inline mr-2" />
            Login
          </button>
        </form>

      </div>
    </main>
  );
}
