import { useNavigate, NavLink } from "react-router-dom";
import { CreditCard, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-foreground font-semibold"
      : "text-muted-foreground hover:text-foreground transition-colors";

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
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>
            <NavLink to="/cards" className={linkClasses}>
              Cards
            </NavLink>
            <NavLink to="/transactions" className={linkClasses}>
              Transactions
            </NavLink>
            <NavLink to="/atm" className={linkClasses}>
              ATM Locator
            </NavLink>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button>Get Started</Button>
              </>
            )}
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
              <NavLink
                to="/dashboard"
                className={linkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/cards"
                className={linkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                Cards
              </NavLink>
              <NavLink
                to="/transactions"
                className={linkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                Transactions
              </NavLink>
              <NavLink
                to="/atm"
                className={linkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                ATM Locator
              </NavLink>

              <div className="flex flex-col gap-2 pt-4">
                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/login");
                      }}
                    >
                      Login
                    </Button>
                    <Button className="w-full">Get Started</Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;