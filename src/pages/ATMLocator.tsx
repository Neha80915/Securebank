import Header from "../components/Header";
import Footer from "../components/Footer";
import ATMLocator from "../components/ATMLocator";

function ATMLocatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="mt-10 mb-6 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Find ATMs Near You
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Locate the nearest SecureBank ATMs with real-time availability status.
          </p>
        </div>
        <ATMLocator />
      </main>
      <Footer />
    </div>
  );
}

export default ATMLocatorPage;
