// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

function LoginPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { cardNumber, pin });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid card number or PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      {/* Left illustration / branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-purple-700/30" />
        <div className="relative z-10 max-w-md space-y-6 px-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-cyan-500/40">
            SecureBank • Modern banking made simple
          </p>
          <h1 className="text-3xl font-bold leading-tight">
            Welcome back to{" "}
            <span className="text-cyan-400">SecureBank</span>
          </h1>
          <p className="text-slate-300 text-sm">
            Log in to manage your accounts, cards, and recent transactions in one beautiful dashboard.
          </p>
          <div className="rounded-2xl bg-slate-900/70 p-4 border border-cyan-500/20 shadow-xl">
            <p className="text-xs text-slate-400 uppercase mb-1">Live balance preview</p>
            <p className="text-2xl font-semibold">₹ 52,340.00</p>
            <p className="mt-1 text-xs text-emerald-400">+ 4.2% this month</p>
          </div>
        </div>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
              Login to your account
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Use your card number and PIN to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-sm text-red-400 rounded-md bg-red-950/40 border border-red-500/40 px-3 py-2">
                {error}
              </p>
            )}

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-200">
                Card number
              </label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-200">
                PIN
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-cyan-500 py-2.5 text-sm font-medium text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-xs text-slate-500">
            This is a demo banking app for learning purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;