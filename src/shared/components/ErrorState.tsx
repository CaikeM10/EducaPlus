import { Alert, AlertDescription, AlertTitle } from "../../app/components/ui/alert";

export function ErrorState({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
