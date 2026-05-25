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
  const [password, setPassword] =
    useState("");
  const [role, setRole] =
    useState("TEACHER");

  const [open, setOpen] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      const { access_token, user } =
        response.data;

      setAuthenticatedUser(user, access_token);

      setOpen(false);

      navigate("/diagnosis");
    } catch (error) {
      alert(getErrorMessage(error));
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
              Crie sua Conta
            </CardTitle>

            <CardDescription className="text-base leading-relaxed">
              Junte-se ao EducaPlus para criar
              experiências educacionais mais
              inclusivas e inteligentes
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
                htmlFor="name"
                className="text-sm font-medium"
              >
                Nome Completo
              </Label>

              <Input
                id="name"
                type="text"
                placeholder="João Victor"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                className="h-11 rounded-xl border-muted-foreground/20 bg-white transition-all focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            </div>

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
              <Label
                htmlFor="password"
                className="text-sm font-medium"
              >
                Senha
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha segura"
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

            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="text-sm font-medium"
              >
                Função
              </Label>

              <Select
                open={open}
                onOpenChange={setOpen}
                value={role}
                onValueChange={(value) => {
                  setRole(value);
                  setOpen(false);
                }}
              >
                <SelectTrigger className="h-11 rounded-xl border-muted-foreground/20 bg-white focus:ring-2 focus:ring-primary/30">
                  <SelectValue placeholder="Selecione sua função" />
                </SelectTrigger>

                <SelectContent className="rounded-xl">
                  <SelectItem value="TEACHER">
                    Professor(a)
                  </SelectItem>

                  <SelectItem value="COORDINATOR">
                    Coordenador(a)
                  </SelectItem>

                  <SelectItem value="SPECIAL_ED">
                    Educação Especial
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl text-sm font-medium shadow-md transition-all hover:scale-[1.01] bg-primary hover:bg-primary/90"
            >
              {loading
                ? "Criando conta..."
                : "Criar Conta"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
