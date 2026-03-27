import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/ui/header";
import { AuthProvider } from "@/providers/auth";
import Footer from "@/components/ui/footer";
import CartProvider from "@/providers/cart";

// O Toaster que configuramos
import { Toaster } from "react-hot-toast";
// 👇 A importação NOVA do Google Analytics
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PurpleTech Store",
  description: "Your Periferic Gamer Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <CartProvider>
              <Header />
              <div className="flex-1">{children}</div>

              {/* Toaster estilizado com a paleta da PurpleTech */}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "#1A1A1E",
                    color: "#fff",
                    border: "1px solid #27272a",
                  },
                  success: {
                    iconTheme: {
                      primary: "#8162FF",
                      secondary: "#fff",
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: "#EF4444", // Vermelho padrão para erros
                      secondary: "#fff",
                    },
                  },
                }}
              />

              <Footer />
            </CartProvider>
          </AuthProvider>
        </div>

        {/* 👇 Injetando o Analytics no final do body! */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
