import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Video,
  Eye,
  Pencil,
} from "lucide-react";

import { Badge } from "../../../app/components/ui/badge";
import { Button } from "../../../app/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../app/components/ui/card";

import { useAuth } from "../../../app/context/AuthContext";

import { recordResourceDownload } from "../services/resources.service";
import { Resource } from "../types";

function getResourceIcon(type: string) {
  if (type === "VIDEO") return Video;
  if (type === "PDF") return FileText;
  return BookOpen;
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const { user } = useAuth();

  const isSpecialEd = user?.role === "SPECIAL_ED";
  const isCoordinator = user?.role === "COORDINATOR";

  const Icon = getResourceIcon(resource.type);

  async function handleAccess() {
    window.open(resource.url, "_blank", "noopener");

    try {
      await recordResourceDownload(resource.id);
    } catch {
      // O acesso ao recurso não deve falhar se o tracking não estiver disponível.
    }
  }
  const buttonLabel = isSpecialEd
    ? "Editar Recurso"
    : isCoordinator
      ? "Visualizar Recurso"
      : "Acessar Recurso";
  const ButtonIcon = isSpecialEd ? Pencil : isCoordinator ? Eye : Download;

  return (
    <Card className="flex h-full flex-col border-0 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-xl bg-primary/10 p-3">
            <Icon className="h-5 w-5 text-primary" />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <Badge variant="outline">{resource.type}</Badge>

            {resource.category && (
              <Badge variant="outline">{resource.category.name}</Badge>
            )}
          </div>
        </div>

        <div>
          <CardTitle className="line-clamp-2 text-lg">
            {resource.title}
          </CardTitle>

          <CardDescription className="mt-2 line-clamp-3 leading-6">
            {resource.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="mt-auto space-y-5">
        <div className="flex flex-wrap gap-2">
          {resource.tags?.map((item) => (
            <Badge key={item.tag.id} variant="outline">
              #{item.tag.name}
            </Badge>
          ))}
        </div>

        <Button className="h-11 w-full shadow-sm" onClick={handleAccess}>
          <ButtonIcon className="mr-2 h-4 w-4" />

          {buttonLabel}

          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
