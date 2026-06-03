import { Navigate } from "react-router";

import { ShieldAlert } from "lucide-react";

import { Card, CardContent } from "../components/ui/card";

import { useAuth, UserRole } from "../context/AuthContext";

type PrivateRouteProps = {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
};

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />

          <p className="text-sm text-muted-foreground">
            Carregando ambiente educacional...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-0 shadow-lg">
          <CardContent className="p-8 text-center space-y-5">
            <div className="bg-destructive/10 text-destructive rounded-2xl p-4 w-fit mx-auto">
              <ShieldAlert className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Acesso restrito</h2>

              <p className="text-muted-foreground text-sm leading-6">
                Seu perfil não possui permissão para acessar esta área da
                plataforma.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return children;
}
