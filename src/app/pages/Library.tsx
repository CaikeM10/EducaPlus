import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Search,
  FileText,
  Video,
  Download,
  BookOpen,
  Users,
  Lightbulb,
} from "lucide-react";

import { api } from "../services/api";

const categories = [
  { id: "all", label: "Todos os Recursos", icon: BookOpen },
  { id: "guides", label: "Guias de Ensino", icon: FileText },
  { id: "videos", label: "Vídeo Tutoriais", icon: Video },
  { id: "strategies", label: "Estratégias", icon: Lightbulb },
  { id: "worksheets", label: "Planilhas", icon: FileText },
  { id: "activities", label: "Atividades", icon: Users },
];

function getResourceIcon(type: string) {
  switch (type?.toUpperCase()) {
    case "VIDEO":
      return Video;

    case "PDF":
      return FileText;

    default:
      return BookOpen;
  }
}

export default function Library() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await api.get("/resources");

        setResources(response.data);
      } catch (error) {
        console.error("Erro ao buscar recursos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "all" ||
      resource.category?.slug === selectedCategory;

    const matchesSearch =
      resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      resource.tags?.some((item: any) =>
        item.tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">
          Carregando recursos...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">
          Biblioteca de Recursos
        </h1>

        <p className="text-muted-foreground">
          Acesse uma coleção curada de recursos e materiais de ensino
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />

        <Input
          type="text"
          placeholder="Buscar recursos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategory === category.id
                ? "default"
                : "outline"
            }
            onClick={() => setSelectedCategory(category.id)}
            className={
              selectedCategory === category.id
                ? "bg-primary hover:bg-primary/90"
                : ""
            }
          >
            <category.icon className="w-4 h-4 mr-2" />
            {category.label}
          </Button>
        ))}
      </div>

      {/* Resources Grid */}
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Mostrando {filteredResources.length} recurso
          {filteredResources.length !== 1 ? "s" : ""}
        </p>

        {filteredResources.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />

              <p>
                Nenhum recurso encontrado correspondente aos seus critérios
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => {
              const Icon = getResourceIcon(resource.type);

              return (
                <Card
                  key={resource.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>

                      <Badge variant="outline">
                        {resource.type}
                      </Badge>
                    </div>

                    <CardTitle className="text-base">
                      {resource.title}
                    </CardTitle>

                    <CardDescription className="text-sm">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags?.map((item: any) => (
                        <Badge
                          key={item.tag.id}
                          variant="secondary"
                          className="text-xs bg-muted hover:bg-muted"
                        >
                          {item.tag.name}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-secondary hover:bg-secondary/90"
                      onClick={() =>
                        window.open(resource.url, "_blank")
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}