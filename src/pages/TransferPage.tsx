import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../lib/api";
import { Send } from "lucide-react";

function TransferPage() {
  const [toCard, setToCard] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const cleaned = toCard.replace(/\s/g, "");
    if (cleaned.length !== 16 || !/^\d+$/.test(cleaned)) {
      setMessage("Card number must be exactly 16 digits.");
      setStatus("error");
      return false;
    }
    if (!amount || Number(amount) <= 0) {
      setMessage("Amount must be greater than ₹0.");
      setStatus("error");
      return false;
    }
    if (Number(amount) > 100000) {
      setMessage("Maximum transfer limit is ₹1,00,000 per transaction.");
      setStatus("error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    const confirmed = window.confirm(
      `Confirm transfer of ₹${Number(amount).toLocaleString("en-IN")} to card ending in ${toCard.slice(-4)}?`
    );
    if (!confirmed) return;

    setStatus("loading");
    try {
      const res = await api.post("/transfers", {
        toCard: toCard.replace(/\s/g, ""),
        amount: Number(amount),
        note,
      });
      setStatus("success");
      setMessage(res.data.message || "Transfer successful!");
      setToCard("");
      setAmount("");
      setNote("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Transfer failed. Please try again.");
    }
  };

  const statusStyles = {
    idle: "",
    loading: "text-blue-600 bg-blue-50 border border-blue-200",
    success: "text-green-700 bg-green-50 border border-green-200",
    error: "text-red-600 bg-red-50 border border-red-200",
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Transfer Money</h1>
                <p className="text-xs text-slate-400">Send money to any SecureBank card</p>
              </div>
            </div>

            {/* Status Message */}
            {message && status !== "idle" && (
              <p className={`text-sm px-4 py-2 rounded-lg ${statusStyles[status]}`}>
                {status === "loading" ? "⏳ " : status === "success" ? "✅ " : "❌ "}
                {message}
              </p>
            )}

            {/* Form */}
            <div className="space-y-4">
              {/* To Card */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">
                  Recipient Card Number
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="1234 5678 9012 3456"
                  value={toCard}
                  onChange={(e) => setToCard(e.target.value)}
                  maxLength={19}
                  required
                />
              </div>

              {/* Amount */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                    placeholder="0.00"
                    value={amount}
                    min={1}
                    max={100000}
                    onChange={(e) =>
                      setAmount(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    required
                  />
                </div>
                <p className="text-xs text-slate-400">Maximum: ₹1,00,000 per transaction</p>
              </div>

              {/* Note */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">
                  Note <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="e.g. Rent payment"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={100}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="flex-1 py-2.5 rounded-lg bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Money
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Success action */}
          {status === "success" && (
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate("/transactions")}
                className="text-sm text-cyan-600 hover:underline"
              >
                View transaction history →
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TransferPage;