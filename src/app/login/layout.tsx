import "@/app/globals.css"; // Puxa o seu Tailwind de volta!

export const metadata = {
  title: "Login | PurpleTech Store",
  description: "Faça login para continuar sua compra",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0A0A0A] text-white antialiased">{children}</body>
    </html>
  );
}
