import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BalanceCard from "../components/BalanceCard";
import BankCard from "../components/BankCard";
import QuickActions from "../components/QuickActions";
import TransactionHistory from "../components/TransactionHistory";
import api from "../lib/api";

type Account = {
  id: number;
  account_type: string;
  balance: number;
};

type Transaction = {
  id: number;
  type: string;
  amount: number;
  note: string;
  created_at: string;
};

type DashboardData = {
  totalBalance: number;
  accounts: Account[];
  recentTransactions: Transaction[];
};

type UserData = {
  name: string;
  cardNumber: string;
};

function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, userRes] = await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/auth/me"),
        ]);
        setDashboard(dashRes.data);
        setUser(userRes.data);
      } catch (err) {
        setError("Failed to load dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
          <div className="mt-16 space-y-6 animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-1/3 mx-auto" />
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
            <div className="grid gap-6 md:grid-cols-3 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-xl" />
              ))}
            </div>
            <div className="h-48 bg-slate-200 rounded-xl mt-6" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <p className="text-red-500 text-lg font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const savingsBalance = dashboard?.accounts?.find(
    (a) => a.account_type === "savings"
  )?.balance ?? 18250;

  const creditBalance = dashboard?.accounts?.find(
    (a) => a.account_type === "credit"
  )?.balance ?? 5000;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 space-y-8 w-full">
        {/* Greeting */}
        <div className="mt-10 mb-6 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            {getGreeting()}, {user?.name ?? "User"} 👋
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor your finances at a glance with real-time balance updates.
          </p>
        </div>

        {/* Balance Cards */}
        <section className="grid gap-6 md:grid-cols-3">
          <BalanceCard
            title="Total Balance"
            amount={dashboard?.totalBalance ?? 0}
            change={12.5}
            icon="wallet"
            delay={0}
          />
          <BalanceCard
            title="Savings Account"
            amount={savingsBalance}
            change={8.2}
            icon="savings"
            delay={100}
          />
          <BalanceCard
            title="Credit Available"
            amount={creditBalance}
            change={-2.1}
            icon="credit"
            delay={200}
          />
        </section>

        {/* Bank Card */}
        {user && (
          <section>
            <h2 className="text-lg font-medium mb-3">Your Card</h2>
            <div className="max-w-sm">
              <BankCard
                type="debit"
                cardNumber={user.cardNumber}
                holderName={user.name.toUpperCase()}
                expiryDate="12/26"
                balance={dashboard?.totalBalance ?? 0}
                variant="blue"
                delay={0}
              />
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
          <div className="max-w-3xl">
            <QuickActions />
          </div>
        </section>

        {/* Recent Transactions */}
        <section>
          <h2 className="text-lg font-medium mb-3">Recent Transactions</h2>
          <TransactionHistory limit={5} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;