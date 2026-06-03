import { BarChart3, BookOpen, Brain, FileText, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../app/components/ui/card";

import { PageHeader } from "../../shared/components/PageHeader";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analytics Educacional"
        title="Relatórios e Insights"
        description="Acompanhe métricas pedagógicas, progresso e evolução da aprendizagem inclusiva."
        icon={<BarChart3 className="h-10 w-10" />}
      />

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Trilhas concluídas
                </p>

                <h3 className="mt-2 text-3xl font-bold">12</h3>
              </div>

              <div className="rounded-2xl bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Recursos acessados
                </p>

                <h3 className="mt-2 text-3xl font-bold">48</h3>
              </div>

              <div className="rounded-2xl bg-secondary/10 p-3">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Evolução mensal</p>

                <h3 className="mt-2 text-3xl font-bold">+24%</h3>
              </div>

              <div className="rounded-2xl bg-green-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Diagnósticos</p>

                <h3 className="mt-2 text-3xl font-bold">7</h3>
              </div>

              <div className="rounded-2xl bg-yellow-500/10 p-3">
                <Brain className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* INSIGHTS */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Insights Pedagógicos</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-2xl border bg-muted/30 p-4">
            <h3 className="font-semibold">Educação Inclusiva</h3>

            <p className="mt-2 text-sm text-muted-foreground leading-6">
              Seu perfil demonstra forte interesse em estratégias inclusivas e
              adaptação curricular.
            </p>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-4">
            <h3 className="font-semibold">Evolução de Aprendizagem</h3>

            <p className="mt-2 text-sm text-muted-foreground leading-6">
              Você aumentou sua participação em trilhas pedagógicas nas últimas
              semanas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
