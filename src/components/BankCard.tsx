import { useState } from "react";
import { Wifi, Eye, EyeOff } from "lucide-react";

interface BankCardProps {
  type: "debit" | "credit";
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  balance: number;
  variant?: "blue" | "teal";
  delay?: number;
}

const BankCard = ({ type, cardNumber, holderName, expiryDate, balance, variant = "blue", delay = 0 }: BankCardProps) => {
  const [showNumber, setShowNumber] = useState(false);

  const maskedNumber = showNumber 
    ? cardNumber 
    : `•••• •••• •••• ${cardNumber.slice(-4)}`;

  return (
    <div 
      className={`bank-card ${variant === "teal" ? "bank-card-teal" : ""} opacity-0 animate-slide-up`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Card Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/20 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/10 translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">
              {type === "credit" ? "Credit Card" : "Debit Card"}
            </p>
            <p className="text-lg font-semibold">SecureBank</p>
          </div>
          <Wifi className="w-8 h-8 rotate-90" />
        </div>

        {/* Card Number */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl tracking-widest font-mono">{maskedNumber}</p>
            <button 
              onClick={() => setShowNumber(!showNumber)}
              className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
            >
              {showNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Card Holder</p>
            <p className="font-semibold">{holderName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Expires</p>
            <p className="font-semibold">{expiryDate}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Balance</p>
            <p className="font-bold text-lg">${balance.toLocaleString()}</p>
          </div>
        </div>

        {/* Chip */}
        <div className="absolute top-1/2 left-6 -translate-y-1/2">
          <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default BankCard;
