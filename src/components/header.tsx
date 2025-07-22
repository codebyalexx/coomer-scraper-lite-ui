import { ArrowLeftIcon, CandyIcon, KeyIcon, KeyRoundIcon } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <CandyIcon className="w-6 h-6 from-pink-500 to-orange-500 bg-gradient-to-r inline-block text-transparent bg-clip-text" />{" "}
            CS UI
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/authentication"
              className="text-sm font-medium hover:text-primary flex items-center gap-2"
            >
              <KeyRoundIcon className="w-4 h-4" /> Authenticate
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
