import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { login, signup, user, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    if (mode === "login") {
      await login(username, password);
    } else {
      await signup(username, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <div className="w-full max-w-md p-6 bg-zinc-800 rounded shadow space-y-4">
        <h2 className="text-xl font-bold text-center">
          {mode === "login" ? "Log In" : "Sign Up"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded font-semibold cursor-pointer"
          >
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="underline text-blue-400 hover:text-blue-300 cursor-pointer"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
