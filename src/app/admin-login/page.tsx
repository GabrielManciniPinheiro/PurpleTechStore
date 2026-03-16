"use client";

import { loginAdmin } from "./action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LockKeyholeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 👇 Importamos o roteador

const AdminLoginPage = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter(); // 👇 Inicializamos o roteador

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const result = await loginAdmin(formData);

    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }

    if (result?.success) {
      // 👇 A MÁGICA: Se deu certo, o router empurra para o dashboard
      router.push("/dashboard");
      router.refresh(); // Garante que o Middleware veja o novo cookie
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950 p-5 font-sans">
      <Card className="w-full max-w-md border-purple-600/20 bg-zinc-900 p-10 text-white shadow-2xl">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="mb-2 rounded-full bg-purple-600/10 p-4">
              <LockKeyholeIcon className="text-purple-600" size={32} />
            </div>
            <h1 className="text-xl font-bold uppercase tracking-widest text-white">
              GMP Technology
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-tighter text-purple-400">
              Acesso Administrativo
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              required
              className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-600"
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              required
              className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-600"
            />
          </div>

          {error && (
            <div className="rounded border border-red-500/50 bg-red-500/10 p-2">
              <p className="text-center text-xs font-semibold text-red-500">
                {error}
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-purple-600 py-6 font-bold uppercase text-white transition-all hover:bg-purple-700"
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" size={20} />
            ) : (
              "Entrar no Sistema"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
