import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSiteContext } from "../../context/SiteContext";

export default function ContactPage() {
  const router = useRouter();
  const { isAuthenticated } = useSiteContext();

  const openSupportChat = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    const chatToggleBtn = document.querySelector(
      'button[aria-label="Chat with admin"]'
    );
    if (chatToggleBtn) {
      chatToggleBtn.click();
    } else {
      router.push("/");
      setTimeout(() => {
        const btn = document.querySelector('button[aria-label="Chat with admin"]');
        btn?.click();
      }, 500);
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Contact Us
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We're here to help with investments, farming support, and general inquiries.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">Phone</h3>
                <a
                  href="tel:+8801700000000"
                  className="text-green-600 hover:text-green-700"
                >
                  +880 1700-000000
                </a>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">Email</h3>
                <a
                  href="mailto:support@krishibazar.com"
                  className="text-green-600 hover:text-green-700"
                >
                  support@krishibazar.com
                </a>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">About KrishiBazar</h3>
                <p className="text-sm text-gray-600">
                  KrishiBazar is a Shariah-compliant agri-investment platform connecting
                  farmers with ethical investors. We enable profit-and-loss sharing,
                  transparent project reporting, and real economic impact without interest (riba).
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={openSupportChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Open Support Chat
              </button>
              <p className="mt-3 text-xs text-gray-500">
                Chat is available for logged-in users. Not logged in? You'll be redirected to sign in.
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    KrishiBazar Support
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>
                  🕌 Shariah-compliant • 🤝 Fair Profit Sharing • 🌾 Real Agricultural Impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
