import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { GraduationCap } from "lucide-react";

import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

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

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const { access_token, user } =
        response.data;

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
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center space-y-5">
          <div className="flex justify-center">
            <div className="bg-primary rounded-2xl p-4 shadow-md">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Bem-vindo ao EducaPlus
            </CardTitle>

            <CardDescription className="text-base leading-relaxed">
              Faça login para acessar seus
              recursos personalizados e
              continuar sua jornada de ensino
              inclusivo
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium"
              >
                E-mail
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="seu.email@escola.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="h-11 rounded-xl border-muted-foreground/20 bg-white transition-all focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  Senha
                </Label>

                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
                className="h-11 rounded-xl border-muted-foreground/20 bg-white transition-all focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            </div>

            <Button
              type="submit"
              disabled={
                loading ||
                !email ||
                !password
              }
              className="w-full h-11 rounded-xl text-sm font-medium shadow-md transition-all hover:scale-[1.01] bg-primary hover:bg-primary/90"
            >
              {loading
                ? "Entrando..."
                : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Não possui uma conta?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
