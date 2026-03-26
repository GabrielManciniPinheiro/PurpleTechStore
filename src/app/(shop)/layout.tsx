import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/ui/header";
import { AuthProvider } from "@/providers/auth";
import Footer from "@/components/ui/footer";
import CartProvider from "@/providers/cart";

// 👇 Substituímos o Sonner pelo React Hot Toast
import { Toaster } from "react-hot-toast";

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
    <html lang="ptbr">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <CartProvider>
              <Header />
              <div className="flex-1">{children}</div>

              {/* 👇 Toaster estilizado com a paleta da PurpleTech */}
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
      </body>
    </html>
  );
}
