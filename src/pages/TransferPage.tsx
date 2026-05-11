import { FormEvent, useState } from "react";
import api from "../lib/api";

function TransferPage() {
  const [toCard, setToCard] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await api.post("/transfers", {
        toCard,
        amount: Number(amount),
        note,
      });
      setStatus("Transfer successful");
    } catch {
      setStatus("Transfer failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow rounded-xl p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold">Transfer money</h1>

        {status && <p className="text-sm text-slate-600">{status}</p>}

        <div className="space-y-1">
          <label className="block text-sm font-medium">To card number</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={toCard}
            onChange={(e) => setToCard(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Note (optional)</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </main>
  );
}

export default TransferPage;