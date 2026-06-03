import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { GraduationCap, Sparkles, ShieldCheck, Users } from "lucide-react";

import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { AnimatedCounter } from "../../shared/components/AnimatedCounter";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { Card, CardContent } from "../components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

type ApiError = {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
};

function getErrorMessage(error: unknown) {
  const apiError = error as ApiError;

  const message = apiError.response?.data?.message;

  if (Array.isArray(message)) {
    return message.join("\n");
  }

  return message || "Erro ao cadastrar";
}

export default function Register() {
  const navigate = useNavigate();

  const { setAuthenticatedUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("TEACHER");

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      const { access_token, user } = response.data;

      setAuthenticatedUser(user, access_token);

      if (role === "SPECIAL_ED") {
        navigate("/app");
      } else {
        navigate("/diagnosis");
      }
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh grid bg-background lg:grid-cols-2">
      {/* HERO */}
      <div className="relative hidden overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-violet-500" />

        {/* EFFECTS */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-400 blur-3xl" />
        </div>

        <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14 text-white">
          {/* TOP */}
          <div className="space-y-10">
            {/* BRAND */}
            <div className="flex items-center gap-4">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <GraduationCap className="h-10 w-10" />
              </div>

              <div>
                <h1 className="text-3xl font-bold">EducaPlus</h1>

                <p className="mt-1 text-lg text-white/80">
                  Educação Inclusiva Inteligente
                </p>
              </div>
            </div>

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />

              <span>Plataforma educacional inclusiva</span>
            </div>

            {/* HERO TEXT */}
            <div className="max-w-xl space-y-3">
              <h1 className="max-w-[620px] text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
                Construa experiências <br />
                <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                  educacionais mais inclusivas
                </span>
              </h1>

              <p className="text-lg leading-5 text-white/70 xl:text-xl">
                Organize trilhas de aprendizagem, acompanhe diagnósticos
                pedagógicos e fortaleça práticas inclusivas com inteligência
                educacional.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <Users className="mb-3 h-6 w-6" />
              <div className="text-5xl font-bold">
                <AnimatedCounter value={120} prefix="+" />
              </div>

              <p className="mt-2 text-sm text-white/80">
                Educadores conectados
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <ShieldCheck className="mb-3 h-6 w-6" />

              <div className="text-5xl font-bold">
                <AnimatedCounter value={100} suffix="%" />
              </div>

              <p className="mt-2 text-sm text-white/80">
                Foco em acessibilidade
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <Sparkles className="mb-3 h-6 w-6" />

              <div className="text-4xl font-bold">IA</div>

              <p className="mt-2 text-sm text-white/80">
                Recomendações inteligentes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="flex items-center justify-center p-5 lg:p-10">
        <div className="w-full max-w-xl">
          {/* MOBILE BRAND */}
          <div className="mb-8 flex items-center justify-center gap-4 lg:hidden">
            <div className="rounded-2xl bg-primary p-3 shadow-lg">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">EducaPlus</h1>

              <p className="text-sm text-muted-foreground">
                Educação Inclusiva Inteligente
              </p>
            </div>
          </div>

          <Card className="glass-card border-white/40 shadow-2xl">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              {/* HEADER */}
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tight leading-tight">
                  <center>Crie sua conta</center>
                </h2>

                <p className="text-base leading-8 text-muted-foreground">
                  Junte-se ao EducaPlus para transformar práticas pedagógicas em
                  experiências mais inclusivas e inteligentes.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* NAME */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>

                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-14 rounded-2xl"
                  />
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="voce@educacao.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 rounded-2xl"
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="Crie uma senha segura"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-14 rounded-2xl"
                  />
                </div>

                {/* ROLE */}
                <div className="space-y-2">
                  <Label>Função</Label>

                  <Select
                    open={open}
                    onOpenChange={setOpen}
                    value={role}
                    onValueChange={(value) => {
                      setRole(value);
                      setOpen(false);
                    }}
                  >
                    <SelectTrigger className="h-14 rounded-2xl">
                      <SelectValue placeholder="Selecione sua função" />
                    </SelectTrigger>

                    <SelectContent className="rounded-2xl">
                      <SelectItem value="TEACHER">Professor(a)</SelectItem>

                      <SelectItem value="COORDINATOR">
                        Coordenador(a)
                      </SelectItem>

                      <SelectItem value="SPECIAL_ED">
                        Educação Especial
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* BUTTON */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-14 w-full rounded-2xl text-base font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/25"
                >
                  {loading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </form>

              {/* FOOTER */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Já possui uma conta?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Entrar
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
