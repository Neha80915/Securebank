import Header from "../components/Header";
import Footer from "../components/Footer";
import BalanceCard from "../components/BalanceCard";
import BankCard from "../components/BankCard";
import QuickActions from "../components/QuickActions";
import TransactionHistory from "../components/TransactionHistory";

type UserData = {
  name: string;
  balance: number;
};

function Dashboard() {
  const user: UserData = {
    name: "Test User",
    balance: 24580,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
   <main className="flex-1 max-w-6xl mx-auto px-4 py-10 space-y-8">
  <div className="mt-10 mb-6 text-center">
    <h1 className="text-4xl font-black tracking-tight text-slate-900">
      Account Overview
    </h1>
    <p className="mt-2 text-sm text-slate-500">
      Monitor your finances at a glance with real-time balance updates and spending insights.
    </p>
  </div>

  {/* cards + quick actions sections below */}


  {/* 3 overview cards */}
  <section className="grid gap-6 md:grid-cols-3">
    <BalanceCard
      title="Total Balance"
      amount={user.balance}
      change={12.5}
      icon="wallet"
      delay={0}
    />
    <BalanceCard
      title="Savings Account"
      amount={18250}
      change={8.2}
      icon="savings"
      delay={100}
    />
    <BalanceCard
      title="Credit Available"
      amount={5000}
      change={-2.1}
      icon="credit"
      delay={200}
    />
  </section>

  {/* Quick actions centered, same width as cards */}
  <section className="mt-4">
    <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
    <div className="max-w-3xl">
      <QuickActions />
    </div>
  </section>
</main>

      

      <Footer />
    </div>
  );
}

export default Dashboard;