import { BookOpen, Download, FileText, Video } from "lucide-react";
import { Badge } from "../../../app/components/ui/badge";
import { Button } from "../../../app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../app/components/ui/card";
import { Resource } from "../types";

function getResourceIcon(type: string) {
  if (type === "VIDEO") return Video;
  if (type === "PDF") return FileText;
  return BookOpen;
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = getResourceIcon(resource.type);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="mb-3 flex items-start justify-between">
          <div className="rounded-xl bg-primary/10 p-3">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <Badge variant="outline">{resource.type}</Badge>
        </div>
        <CardTitle className="text-lg">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {resource.tags?.map((item) => (
            <Badge key={item.tag.id} variant="outline">
              #{item.tag.name}
            </Badge>
          ))}
        </div>
        <Button
          className="w-full"
          onClick={() => window.open(resource.url, "_blank", "noopener")}
        >
          <Download className="mr-2 h-4 w-4" />
          Acessar Recurso
        </Button>
      </CardContent>
    </Card>
  );
}
