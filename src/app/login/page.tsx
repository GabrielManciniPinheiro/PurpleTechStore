"use client";

import { signIn } from "next-auth/react";
import { LogInIcon } from "lucide-react";

const LoginPage = () => {
  const handleLogin = () => {
    // Chama o login do Google e redireciona de volta para a Home após o sucesso
    signIn("google", { callbackUrl: "/" });
  };

  return (
    // 👇 Forçando o fundo escuro (bg-[#0A0A0A]) e a altura da tela inteira (min-h-screen)
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0A0A0A] px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-8 rounded-2xl border border-gray-800 bg-[#121214] p-8 shadow-2xl">
        {/* Cabeçalho do Card */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1A1E] text-[#8162FF]">
            <LogInIcon size={24} />
          </div>
          <h1 className="mt-2 text-2xl font-bold text-[#8162FF]">
            PurpleTech <span className="text-white">Store</span>
          </h1>
          <p className="text-sm text-gray-400">
            Faça login com sua conta do Google para continuar sua compra e
            salvar seus pedidos.
          </p>
        </div>

        {/* Botão do Google Estilizado */}
        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-700 bg-[#1A1A1E] px-4 py-3 text-sm font-semibold text-white transition-all hover:border-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8162FF] focus:ring-offset-2 focus:ring-offset-[#121214]"
        >
          {/* SVG do logo oficial do Google */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Entrar com o Google
        </button>

        {/* Rodapé do Card */}
        <p className="text-center text-xs text-gray-500">
          Ao prosseguir, você concorda com nossos Termos de Serviço e Política
          de Privacidade.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
