// src/app/admin-login/layout.tsx
import "../globals.css"; // Garante que o Tailwind seja carregado aqui!

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
