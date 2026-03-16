import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Tenta pegar o cookie de sessão do administrador
  const adminSession = request.cookies.get("gmp_admin_session");

  // 2. Se o usuário estiver tentando acessar o dashboard SEM o cookie...
  if (request.nextUrl.pathname.startsWith("/dashboard") && !adminSession) {
    // ... ele é chutado para a página de login
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  // 3. Se estiver tudo ok, o fluxo segue normalmente
  return NextResponse.next();
}

// Configuração para o Middleware agir apenas nas rotas do painel
export const config = {
  matcher: ["/dashboard/:path*"],
};
