import { MapPin, Clock, CheckCircle, Navigation } from "lucide-react";
import { Button } from "./ui/button";

const atmLocations = [
  { id: 1, name: "SecureBank ATM - Main Street", address: "123 Main Street, Downtown", distance: "0.3 km", available: true, hours: "24/7" },
  { id: 2, name: "SecureBank ATM - Mall Plaza", address: "456 Shopping Center Blvd", distance: "1.2 km", available: true, hours: "8 AM - 10 PM" },
  { id: 3, name: "SecureBank ATM - University", address: "789 College Avenue", distance: "2.5 km", available: false, hours: "24/7" },
  { id: 4, name: "SecureBank ATM - Airport", address: "Terminal 1, Airport Road", distance: "5.8 km", available: true, hours: "24/7" },
];

const ATMLocator = () => {
  return (
    <div className="space-y-4">
      {atmLocations.map((atm, index) => (
        <div 
          key={atm.id}
          className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 opacity-0 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <MapPin className="w-7 h-7 text-accent" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-foreground">{atm.name}</p>
              {atm.available ? (
                <span className="flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Available
                </span>
              ) : (
                <span className="text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                  Under Maintenance
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{atm.address}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                {atm.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {atm.hours}
              </span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="shrink-0">
            Get Directions
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ATMLocator;
