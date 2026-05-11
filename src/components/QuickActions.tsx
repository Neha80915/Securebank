import { Send, Download, RefreshCw, Receipt, QrCode, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
const actions = [
  { icon: Send, label: "Send Money", color: "text-primary" },
  { icon: Download, label: "Withdraw", color: "text-accent" },
  { icon: RefreshCw, label: "Transfer", color: "text-success" },
  { icon: Receipt, label: "Pay Bills", color: "text-warning" },
  { icon: QrCode, label: "Scan QR", color: "text-primary" },
  { icon: CreditCard, label: "Add Card", color: "text-accent" },
];

const QuickActions = () => {
  const navigate = useNavigate();
  const handleAction = (label: string) => {
    if (label === "Send Money" || label === "Transfer") {
      navigate("/transfer");
      return;
    }
    if (label === "Withdraw") {
      navigate("/atm");
      return;
    }
    if (label === "Add Card") {
      navigate("/cards");
      return;
    }
    if (label === "Pay Bills") {
      alert("Pay Bill functionality coming soon!");
      return;
    }
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
          className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
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
