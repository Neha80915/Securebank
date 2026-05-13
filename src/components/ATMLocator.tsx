import { useEffect, useState } from "react";
import { MapPin, Clock, CheckCircle, Navigation, Search } from "lucide-react";
import { Button } from "./ui/button";
import api from "../lib/api";

type ATM = {
  id: number;
  name: string;
  address: string;
  distance: string;
  available: number;
  hours: string;
};

const ATMLocator = () => {
  const [atmLocations, setAtmLocations] = useState<ATM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAtms = async () => {
      try {
        const res = await api.get("/atms");
        setAtmLocations(res.data);
      } catch (err) {
        setError("Failed to load ATM locations.");
      } finally {
        setLoading(false);
      }
    };
    fetchAtms();
  }, []);

  const filtered = atmLocations.filter(
    (atm) =>
      atm.name.toLowerCase().includes(search.toLowerCase()) ||
      atm.address.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-slate-200 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search ATMs by name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <MapPin className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p>No ATMs found matching your search.</p>
        </div>
      )}

      {/* ATM List */}
      {filtered.map((atm, index) => (
        <div
          key={atm.id}
          className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 opacity-0 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
        >
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <MapPin className="w-7 h-7 text-accent" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <p className="font-semibold text-foreground">{atm.name}</p>
              {atm.available ? (
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Available
                </span>
              ) : (
                <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
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

          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/${encodeURIComponent(atm.address)}`,
                "_blank"
              )
            }
          >
            Get Directions
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ATMLocator;