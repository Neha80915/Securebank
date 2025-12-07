import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, CreditCard } from "lucide-react";

interface BalanceCardProps {
  title: string;
  amount: number;
  change: number;
  icon: "wallet" | "savings" | "credit";
  delay?: number;
}

const BalanceCard = ({ title, amount, change, icon, delay = 0 }: BalanceCardProps) => {
  const [displayAmount, setDisplayAmount] = useState(0);
  const isPositive = change >= 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = amount / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= amount) {
          setDisplayAmount(amount);
          clearInterval(interval);
        } else {
          setDisplayAmount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [amount, delay]);

  const IconComponent = {
    wallet: Wallet,
    savings: PiggyBank,
    credit: CreditCard,
  }[icon];

  return (
    <div className="stat-card opacity-0 animate-slide-up" style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-primary" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${
          isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-3xl font-bold text-foreground">
        ${displayAmount.toLocaleString()}
        <span className="text-lg text-muted-foreground">.00</span>
      </p>
    </div>
  );
};

export default BalanceCard;
