import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center space-y-5 px-4">
        <AlertCircle className="w-16 h-16 text-slate-300 mx-auto" />
        <div>
          <h1 className="text-6xl font-black text-slate-900 mb-2">404</h1>
          <p className="text-xl text-slate-500 font-medium">Page not found</p>
          <p className="text-sm text-slate-400 mt-1">
            The page{" "}
            <span className="font-mono bg-slate-100 px-1 rounded">
              {location.pathname}
            </span>{" "}
            doesn't exist.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 transition"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;