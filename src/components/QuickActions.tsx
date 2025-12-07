import { Send, Download, RefreshCw, Receipt, QrCode, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const actions = [
  { icon: Send, label: "Send Money", color: "text-primary" },
  { icon: Download, label: "Withdraw", color: "text-accent" },
  { icon: RefreshCw, label: "Transfer", color: "text-success" },
  { icon: Receipt, label: "Pay Bills", color: "text-warning" },
  { icon: QrCode, label: "Scan QR", color: "text-primary" },
  { icon: CreditCard, label: "Add Card", color: "text-accent" },
];

const QuickActions = () => {
  const handleAction = (label: string) => {
    toast({
      title: `${label} Selected`,
      description: `This feature would open the ${label.toLowerCase()} interface.`,
    });
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {actions.map((action, index) => (
        <button
          key={action.label}
          onClick={() => handleAction(action.label)}
          className="action-btn opacity-0 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
          <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${action.color}`}>
            <action.icon className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-foreground">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
