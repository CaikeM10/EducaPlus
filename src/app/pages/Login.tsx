import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { GraduationCap } from "lucide-react";

import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

import { AnimatedCounter } from "../../shared/components/AnimatedCounter";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { access_token, user } = response.data;

      setAuthenticatedUser(user, access_token);

      const diagnosisResponse = await api.get("/diagnosis/me");
      const diagnosisCompleted = diagnosisResponse.data.meta.total > 0;

      if (diagnosisCompleted) {
        navigate("/app");
      } else {
        navigate("/diagnosis");
      }
    } catch (error) {
      console.error(error);

      alert("E-mail ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background overflow-hidden">
      {/* LEFT SIDE */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary to-accent p-14 text-white">
        {/* BG EFFECT */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-white blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary blur-3xl" />
        </div>

        {/* BRAND */}
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-sm border border-white/20">
              <GraduationCap className="h-10 w-10" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">EducaPlus</h1>

              <p className="text-white/80 text-lg">
                Educação Inclusiva Inteligente
              </p>
            </div>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-xl space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              Plataforma educacional inclusiva
            </div>

            <h1 className="max-w-[620px] text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
              Transforme sua <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                prática pedagógica
              </span>
            </h1>
            <p className="text-xl leading-9 text-white/85">
              Organize trilhas de aprendizagem, acompanhe diagnósticos e
              fortaleça experiências educacionais inclusivas com inteligência
              pedagógica.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="text-5xl font-bold">
                <AnimatedCounter value={120} prefix="+" />
              </div>
              <p className="mt-2 text-white/80">
                Recursos pedagógicos inclusivos
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="text-5xl font-bold">
                <AnimatedCounter value={100} suffix="%" />
              </div>

              <p className="mt-2 text-white/80">
                Foco em acessibilidade educacional
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 text-sm text-white/70">
          © 2026 EducaPlus • Plataforma Inteligente de Inclusão Educacional
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6 lg:p-14">
        <div className="w-full max-w-lg">
          {/* MOBILE BRAND */}
          <div className="mb-10 flex items-center justify-center gap-4 lg:hidden">
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
            <CardHeader className="space-y-6 pb-2">
              <div className="space-y-3 text-center lg:text-left">
                <CardTitle className="text-4xl font-bold tracking-tight leading-tight">
                  <center>Bem-vindo de volta</center>
                </CardTitle>

                <CardDescription className="text-base leading-8 text-muted-foreground">
                  Faça login para acessar seus recursos pedagógicos,
                  diagnósticos e ferramentas educacionais inteligentes.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email">E-mail</Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@escola.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 rounded-2xl"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>

                    <button
                      type="button"
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-14 rounded-2xl"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || !email || !password}
                  className="h-14 w-full rounded-2xl text-base font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/25"
                >
                  {loading ? "Entrando..." : "Entrar na plataforma"}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-muted-foreground">
                Não possui uma conta?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Cadastre-se
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
