import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>Student Banking Project 2025</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
            Modern Banking
            <span className="block gradient-text">Made Simple</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up stagger-1">
            Experience seamless banking with our ATM, credit & debit card management system. 
            Check balances, track transactions, and manage your finances with ease.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up stagger-2">
            <Button variant="hero" size="xl" onClick={() => navigate("/login")}>
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="xl">
              Learn More
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in stagger-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Instant Transfers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">24/7 Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
