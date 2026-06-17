import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import { GraduationCap, Sparkles, Brain, CheckCircle2 } from "lucide-react";

import { api } from "../services/api";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Progress } from "../components/ui/progress";

import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

import { Label } from "../components/ui/label";

const questions = [
  {
    id: 1,
    question: "Quantos anos de experiência de ensino você possui?",
    options: [
      {
        value: "0-2",
        label: "0-2 anos",
      },
      {
        value: "3-5",
        label: "3-5 anos",
      },
      {
        value: "6-10",
        label: "6-10 anos",
      },
      {
        value: "10+",
        label: "Mais de 10 anos",
      },
    ],
  },

  {
    id: 2,
    question: "Você já trabalhou com alunos com TDAH?",
    options: [
      {
        value: "never",
        label: "Nunca",
      },
      {
        value: "rarely",
        label: "Raramente",
      },
      {
        value: "sometimes",
        label: "Às vezes",
      },
      {
        value: "frequently",
        label: "Frequentemente",
      },
    ],
  },

  {
    id: 3,
    question: "Você já trabalhou com alunos no espectro autista?",
    options: [
      {
        value: "never",
        label: "Nunca",
      },
      {
        value: "rarely",
        label: "Raramente",
      },
      {
        value: "sometimes",
        label: "Às vezes",
      },
      {
        value: "frequently",
        label: "Frequentemente",
      },
    ],
  },

  {
    id: 4,
    question: "Você já trabalhou com alunos com dislexia?",
    options: [
      {
        value: "never",
        label: "Nunca",
      },
      {
        value: "rarely",
        label: "Raramente",
      },
      {
        value: "sometimes",
        label: "Às vezes",
      },
      {
        value: "frequently",
        label: "Frequentemente",
      },
    ],
  },

  {
    id: 5,
    question:
      "Qual é sua principal área de interesse para desenvolvimento profissional?",
    options: [
      {
        value: "inclusive",
        label: "Estratégias de educação inclusiva",
      },
      {
        value: "classroom",
        label: "Gestão de sala de aula",
      },
      {
        value: "curriculum",
        label: "Adaptação curricular",
      },
      {
        value: "assessment",
        label: "Métodos alternativos de avaliação",
      },
    ],
  },
  {
    id: 6,
    question:
      "Com que frequência você realiza adaptações curriculares para estudantes com necessidades específicas?",
    options: [
      {
        value: "never",
        label: "Nunca",
      },
      {
        value: "sometimes",
        label: "Às vezes",
      },
      {
        value: "often",
        label: "Frequentemente",
      },
      {
        value: "always",
        label: "Sempre",
      },
    ],
  },

  {
    id: 7,
    question:
      "Qual é sua maior dificuldade ao trabalhar com educação inclusiva?",
    options: [
      {
        value: "planning",
        label: "Planejamento pedagógico",
      },
      {
        value: "assessment",
        label: "Avaliação da aprendizagem",
      },
      {
        value: "behavior",
        label: "Gestão comportamental",
      },
      {
        value: "adaptation",
        label: "Adaptação de atividades",
      },
    ],
  },

  {
    id: 8,
    question:
      "Você gostaria de receber mais recomendações relacionadas a qual tema?",
    options: [
      {
        value: "autism",
        label: "TEA - Transtorno do Espectro Autista",
      },
      {
        value: "adhd",
        label: "TDAH",
      },
      {
        value: "dyslexia",
        label: "Dislexia",
      },
      {
        value: "inclusive",
        label: "Educação Inclusiva em geral",
      },
    ],
  },
];

export default function Diagnosis() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [loading, setLoading] = useState(false);

  // REDIRECIONA EDUCADORES ESPECIAIS
  useEffect(() => {
    const storage = localStorage.getItem("@educaplus:user");

    if (!storage) return;

    const parsedUser = JSON.parse(storage);

    console.log("USUÁRIO:", parsedUser);

    const role =
      parsedUser?.role ||
      parsedUser?.user?.role ||
      parsedUser?.profile ||
      parsedUser?.type;

    console.log("ROLE:", role);
    const blockedRoles = [
      "COORDINATOR",
      "SPECIAL_ED",
      "EDUCADOR_ESPECIAL",
      "educador_especial",
      "SPECIAL_EDUCATOR",
      "educador",
    ];

    if (blockedRoles.includes(role)) {
      navigate("/app", { replace: true });
    }
  }, [navigate]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = async () => {
    try {
      setLoading(true);

      await api.post("/diagnosis", {
        answers,
      });

      navigate("/app");
    } catch (error) {
      console.error(error);

      alert("Erro ao salvar diagnóstico.");
    } finally {
      setLoading(false);
    }
  };

  const currentAnswer = answers[questions[currentQuestion].id];

  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* HERO */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Diagnóstico Inteligente
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight">
                Personalize sua experiência educacional
              </h1>

              <p className="text-lg text-muted-foreground leading-8">
                O EDUCAPLUS utiliza seu perfil pedagógico para recomendar
                trilhas, estratégias inclusivas e ferramentas alinhadas às suas
                necessidades profissionais.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-2xl p-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Recomendações inteligentes
                </h3>

                <p className="text-muted-foreground leading-7">
                  Conteúdos personalizados conforme sua experiência e interesses
                  pedagógicos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-2xl p-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Planejamento inclusivo
                </h3>

                <p className="text-muted-foreground leading-7">
                  Ferramentas voltadas para práticas pedagógicas inclusivas e
                  acompanhamento educacional.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <Card className="border-0 shadow-2xl rounded-3xl">
          <CardHeader className="text-center space-y-5 pb-2">
            <div className="flex justify-center">
              <div className="bg-primary rounded-3xl p-4 shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              <CardTitle className="text-3xl font-bold">
                Diagnóstico Pedagógico Inteligente
              </CardTitle>

              <CardDescription className="text-base leading-7">
                Responda ao formulário para que o sistema identifique suas
                necessidades pedagógicas e recomende trilhas, recursos e
                estratégias inclusivas mais adequadas ao seu perfil.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 p-8">
            {/* PROGRESS */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>

                <span>{Math.round(progress)}%</span>
              </div>

              <Progress value={progress} className="h-2.5" />
            </div>

            {/* QUESTION */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold leading-relaxed">
                {questions[currentQuestion].question}
              </h3>

              <RadioGroup
                key={questions[currentQuestion].id}
                value={currentAnswer ?? ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option) => {
                  const isSelected = currentAnswer === option.value;

                  return (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={`
                        flex items-center gap-4 rounded-2xl border p-5
                        cursor-pointer transition-all duration-200
                        hover:border-primary/50 hover:bg-muted/40
                        ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20"
                            : "border-border"
                        }
                      `}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />

                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {option.label}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          Clique para selecionar
                        </span>
                      </div>
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between gap-4 pt-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0 || loading}
                className="min-w-[120px]"
              >
                Anterior
              </Button>

              {isLastQuestion ? (
                <Button
                  onClick={handleFinish}
                  disabled={!currentAnswer || loading}
                  className="min-w-[140px] h-11"
                >
                  {loading ? "Finalizando..." : "Finalizar diagnóstico"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer || loading}
                  className="min-w-[120px] h-11"
                >
                  Próxima
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
