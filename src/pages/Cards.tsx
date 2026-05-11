import Header from "../components/Header";
import Footer from "../components/Footer";
import BankCard from "../components/BankCard";

const Cards = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-28">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 pb-10 space-y-6">
        <h1 className="text-3xl font-bold text-foreground text-center mb-4">
          Cards
        </h1>

        <p className="text-center text-sm text-slate-500">
          Manage your debit and credit cards here.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <BankCard
            type="debit"
            cardNumber="4532 1234 5678 9012"
            holderName="JOHN DOE"
            expiryDate="12/26"
            balance={24580}
            variant="blue"
            delay={100}
          />
          <BankCard
            type="credit"
            cardNumber="5425 9876 5432 1098"
            holderName="JOHN DOE"
            expiryDate="08/27"
            balance={5000}
            variant="teal"
            delay={200}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cards;
