import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import SimulationPage from "./features/simulation/SimulationPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      <main className="min-h-screen bg-zinc-900 text-white">
        {/* Top Navbar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-700">
          <h1 className="text-xl font-bold">
            <Link to="/" className="hover:underline cursor-pointer">TFT Sim</Link>
          </h1>

          <div className="text-sm space-x-3 flex items-center">
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                Admin Panel
              </Link>
            )}

            {loading ? null : user ? (
              <>
                <span>
                  Logged in as <strong>{user.username}</strong>
                </span>
                <button
                  onClick={logout}
                  className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="hover:underline cursor-pointer">
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<SimulationPage />} />
          <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
