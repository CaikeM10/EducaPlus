import { useState } from "react";
import { useNavigate } from "react-router";

import { GraduationCap } from "lucide-react";

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
import {
  RadioGroup,
  RadioGroupItem,
} from "../components/ui/radio-group";
import { Label } from "../components/ui/label";

const questions = [
  {
    id: 1,
    question: "Quantos anos de experiência de ensino você possui?",
    options: [
      { value: "0-2", label: "0-2 anos" },
      { value: "3-5", label: "3-5 anos" },
      { value: "6-10", label: "6-10 anos" },
      { value: "10+", label: "Mais de 10 anos" },
    ],
  },
  {
    id: 2,
    question: "Você já trabalhou com alunos com TDAH?",
    options: [
      { value: "never", label: "Nunca" },
      { value: "rarely", label: "Raramente" },
      { value: "sometimes", label: "Às vezes" },
      { value: "frequently", label: "Frequentemente" },
    ],
  },
  {
    id: 3,
    question: "Você já trabalhou com alunos no espectro autista?",
    options: [
      { value: "never", label: "Nunca" },
      { value: "rarely", label: "Raramente" },
      { value: "sometimes", label: "Às vezes" },
      { value: "frequently", label: "Frequentemente" },
    ],
  },
  {
    id: 4,
    question: "Você já trabalhou com alunos com dislexia?",
    options: [
      { value: "never", label: "Nunca" },
      { value: "rarely", label: "Raramente" },
      { value: "sometimes", label: "Às vezes" },
      { value: "frequently", label: "Frequentemente" },
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
];

export default function Diagnosis() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});

  const [loading, setLoading] = useState(false);

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

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

  const currentAnswer =
    answers[questions[currentQuestion].id];

  const isLastQuestion =
    currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-2xl border-0 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary rounded-2xl p-4 shadow-md">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">
              Diagnóstico Inicial
            </CardTitle>

            <CardDescription className="text-base">
              Ajude-nos a personalizar sua experiência
              respondendo algumas perguntas
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Pergunta {currentQuestion + 1} de{" "}
                {questions.length}
              </span>

              <span>
                {Math.round(progress)}%
              </span>
            </div>

            <Progress
              value={progress}
              className="h-2"
            />
          </div>

          <div className="space-y-5">
            <h3 className="text-xl font-semibold leading-relaxed">
              {
                questions[currentQuestion]
                  .question
              }
            </h3>

            <RadioGroup
              value={currentAnswer}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {questions[
                currentQuestion
              ].options.map((option) => {
                const isSelected =
                  currentAnswer === option.value;

                return (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={`
                      flex items-center gap-4 rounded-xl border p-4
                      cursor-pointer transition-all duration-200
                      hover:border-primary/50 hover:bg-muted/40
                      ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                          : "border-border"
                      }
                    `}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="mt-0.5"
                    />

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

          <div className="flex justify-between gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={
                currentQuestion === 0 || loading
              }
              className="min-w-[120px]"
            >
              Anterior
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={handleFinish}
                disabled={
                  !currentAnswer || loading
                }
                className="min-w-[120px] bg-secondary hover:bg-secondary/90"
              >
                {loading
                  ? "Salvando..."
                  : "Finalizar"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={
                  !currentAnswer || loading
                }
                className="min-w-[120px] bg-primary hover:bg-primary/90"
              >
                Próxima
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
