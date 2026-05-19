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

      localStorage.setItem(
        "diagnosisCompleted",
        "true",
      );

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>

          <CardTitle className="text-2xl">
            Diagnóstico Inicial
          </CardTitle>

          <CardDescription>
            Ajude-nos a personalizar sua experiência
            respondendo algumas perguntas
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
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

          <div className="space-y-4">
            <h3 className="text-lg">
              {
                questions[currentQuestion]
                  .question
              }
            </h3>

            <RadioGroup
              value={currentAnswer}
              onValueChange={handleAnswer}
            >
              <div className="space-y-3">
                {questions[
                  currentQuestion
                ].options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                    />

                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={
                currentQuestion === 0 || loading
              }
            >
              Anterior
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={handleFinish}
                disabled={
                  !currentAnswer || loading
                }
                className="bg-secondary hover:bg-secondary/90"
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
                className="bg-primary hover:bg-primary/90"
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