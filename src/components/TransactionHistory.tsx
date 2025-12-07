import { ArrowUpRight, ArrowDownLeft, Coffee, ShoppingBag, Utensils, Car, Smartphone } from "lucide-react";

const transactions = [
  { id: 1, name: "Coffee Shop", category: "Food & Drinks", amount: -4.50, date: "Today, 9:30 AM", icon: Coffee, type: "expense" },
  { id: 2, name: "Salary Deposit", category: "Income", amount: 3500.00, date: "Yesterday", icon: ArrowDownLeft, type: "income" },
  { id: 3, name: "Shopping Mall", category: "Shopping", amount: -156.80, date: "Dec 5, 2024", icon: ShoppingBag, type: "expense" },
  { id: 4, name: "Restaurant", category: "Food & Drinks", amount: -45.00, date: "Dec 4, 2024", icon: Utensils, type: "expense" },
  { id: 5, name: "Gas Station", category: "Transportation", amount: -60.00, date: "Dec 3, 2024", icon: Car, type: "expense" },
  { id: 6, name: "Phone Bill", category: "Utilities", amount: -85.00, date: "Dec 2, 2024", icon: Smartphone, type: "expense" },
];

const TransactionHistory = () => {
  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <div 
          key={transaction.id}
          className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300 opacity-0 animate-slide-in-right cursor-pointer"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            transaction.type === "income" ? "bg-success/10" : "bg-muted"
          }`}>
            <transaction.icon className={`w-5 h-5 ${
              transaction.type === "income" ? "text-success" : "text-muted-foreground"
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.category}</p>
          </div>
          
          <div className="text-right">
            <p className={`font-semibold ${
              transaction.type === "income" ? "text-success" : "text-foreground"
            }`}>
              {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{transaction.date}</p>
          </div>
          
          <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
