import { CreditCard, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SecureBank</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>
            <a href="#cards" className="text-muted-foreground hover:text-foreground transition-colors">Cards</a>
            <a href="#transactions" className="text-muted-foreground hover:text-foreground transition-colors">Transactions</a>
            <a href="#atm" className="text-muted-foreground hover:text-foreground transition-colors">ATM Locator</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">Login</Button>
            <Button>Get Started</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <nav className="flex flex-col gap-4">
              <a href="#dashboard" className="text-muted-foreground hover:text-foreground transition-colors py-2">Dashboard</a>
              <a href="#cards" className="text-muted-foreground hover:text-foreground transition-colors py-2">Cards</a>
              <a href="#transactions" className="text-muted-foreground hover:text-foreground transition-colors py-2">Transactions</a>
              <a href="#atm" className="text-muted-foreground hover:text-foreground transition-colors py-2">ATM Locator</a>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" className="w-full">Login</Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
