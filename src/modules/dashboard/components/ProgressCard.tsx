import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../app/components/ui/card";
import { Progress } from "../../../app/components/ui/progress";

type ProgressCardProps = {
  value: number;
};

export function ProgressCard({ value }: ProgressCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Progresso Geral
        </CardTitle>
        <TrendingUp className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-3xl font-bold">{value}%</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Média das trilhas iniciadas
          </p>
        </div>
        <Progress value={value} className="h-2.5" />
      </CardContent>
    </Card>
  );
}
