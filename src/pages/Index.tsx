import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BalanceCard from "@/components/BalanceCard";
import BankCard from "@/components/BankCard";
import QuickActions from "@/components/QuickActions";
import TransactionHistory from "@/components/TransactionHistory";
import ATMLocator from "@/components/ATMLocator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* Dashboard Section */}
      <section id="dashboard" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Account Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Monitor your finances at a glance with real-time balance updates and spending insights.
            </p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <BalanceCard 
              title="Total Balance" 
              amount={24580} 
              change={12.5} 
              icon="wallet"
              delay={100}
            />
            <BalanceCard 
              title="Savings Account" 
              amount={18250} 
              change={8.2} 
              icon="savings"
              delay={200}
            />
            <BalanceCard 
              title="Credit Available" 
              amount={5000} 
              change={-2.1} 
              icon="credit"
              delay={300}
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h3>
            <QuickActions />
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id="cards" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your Cards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage your credit and debit cards in one place. View balances, card details, and more.
            </p>
          </div>

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
        </div>
      </section>

      {/* Transactions Section */}
      <section id="transactions" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Recent Transactions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track all your transactions with detailed information about each payment.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <TransactionHistory />
          </div>
        </div>
      </section>

      {/* ATM Locator Section */}
      <section id="atm" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Find ATMs Near You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Locate the nearest SecureBank ATMs with real-time availability status.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ATMLocator />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
