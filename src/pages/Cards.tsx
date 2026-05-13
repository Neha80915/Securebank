import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BankCard from "../components/BankCard";
import api from "../lib/api";
import { CreditCard } from "lucide-react";

type Card = {
  id: number;
  card_type: "debit" | "credit";
  card_number: string;
  expiry: string;
  balance?: number;
};

type UserData = {
  name: string;
  balance: number;
};

const Cards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardsRes, userRes] = await Promise.all([
          api.get("/cards"),
          api.get("/auth/me"),
        ]);
        setCards(cardsRes.data);
        setUser(userRes.data);
      } catch (err) {
        setError("Failed to load cards. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 pt-28">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto px-4 pb-10 w-full">
          <div className="animate-pulse space-y-6 mt-4">
            <div className="h-8 bg-slate-200 rounded w-1/4 mx-auto" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="h-52 bg-slate-200 rounded-2xl" />
              <div className="h-52 bg-slate-200 rounded-2xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 pt-28">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <p className="text-red-500">{error}</p>
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-28">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 pb-10 space-y-6 w-full">
        <h1 className="text-3xl font-bold text-foreground text-center mb-2">
          My Cards
        </h1>
        <p className="text-center text-sm text-slate-500 mb-6">
          Manage your debit and credit cards here.
        </p>

        {/* No cards empty state */}
        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <CreditCard className="w-14 h-14 text-slate-300" />
            <p className="text-slate-500 font-medium">No cards found</p>
            <p className="text-sm text-slate-400">
              Contact your bank to get a card linked to your account.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {cards.map((card, index) => (
              <BankCard
                key={card.id}
                type={card.card_type}
                cardNumber={card.card_number}
                holderName={user?.name?.toUpperCase() ?? "CARD HOLDER"}
                expiryDate={card.expiry}
                balance={user?.balance ?? 0}
                variant={card.card_type === "debit" ? "blue" : "teal"}
                delay={index * 100}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cards;