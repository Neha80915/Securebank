import Header from "../components/Header";
import Footer from "../components/Footer";
import TransactionHistory from "../components/TransactionHistory";

function Transactions() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="mt-10 mb-6 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Transaction History
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            View all your recent transactions and account activity.
          </p>
        </div>
        <TransactionHistory />
      </main>
      <Footer />
    </div>
  );
}

export default Transactions;
