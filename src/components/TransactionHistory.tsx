import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Landmark,
  Receipt,
} from "lucide-react";
import api from "../lib/api";

type Transaction = {
  id: number;
  type: string;
  amount: number;
  note: string;
  created_at: string;
};

interface TransactionHistoryProps {
  limit?: number;
}

const getIcon = (type: string) => {
  switch (type) {
    case "transfer_in":
      return ArrowDownLeft;
    case "transfer_out":
      return ArrowUpRight;
    case "deposit":
      return Landmark;
    case "withdraw":
      return RefreshCw;
    default:
      return Receipt;
  }
};

const getLabel = (type: string) => {
  switch (type) {
    case "transfer_in": return "Money Received";
    case "transfer_out": return "Money Sent";
    case "deposit": return "Deposit";
    case "withdraw": return "Withdrawal";
    default: return type;
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return `Today, ${date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const TransactionHistory = ({ limit }: TransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions");
        const data = limit ? res.data.slice(0, limit) : res.data;
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [limit]);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-slate-200 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400 space-y-2">
        <Receipt className="w-10 h-10 mx-auto opacity-40" />
        <p className="font-medium">No transactions yet</p>
        <p className="text-sm">Your transactions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => {
        const Icon = getIcon(transaction.type);
        const isIncome = transaction.amount > 0;

        return (
          <div
            key={transaction.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300 opacity-0 animate-slide-in-right cursor-pointer"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isIncome ? "bg-green-100" : "bg-slate-100"
            }`}>
              <Icon className={`w-5 h-5 ${isIncome ? "text-green-600" : "text-slate-500"}`} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {getLabel(transaction.type)}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {transaction.note || transaction.type}
              </p>
            </div>

            <div className="text-right">
              <p className={`font-semibold ${isIncome ? "text-green-600" : "text-foreground"}`}>
                {isIncome ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(transaction.created_at)}
              </p>
            </div>

            <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </div>
        );
      })}
    </div>
  );
};

export default TransactionHistory;