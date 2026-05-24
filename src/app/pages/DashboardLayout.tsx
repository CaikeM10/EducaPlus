import { useState } from "react";
import {
  Outlet,
  useNavigate,
  Link,
  useLocation,
} from "react-router";

import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Library,
  BookMarked,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import { Button } from "../components/ui/button";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const location = useLocation();

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  const navItems = [
    {
      path: "/app",
      label: "Painel",
      icon: LayoutDashboard,
    },
    {
      path: "/app/learning-paths",
      label:
        "Trilhas de Aprendizado",
      icon: BookOpen,
    },
    {
      path: "/app/planner",
      label: "Planejador",
      icon: Calendar,
    },
    {
      path: "/app/library",
      label: "Biblioteca",
      icon: Library,
    },
    {
      path: "/app/diary",
      label: "Diário",
      icon: BookMarked,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return (
        location.pathname === path
      );
    }

    return location.pathname.startsWith(
      path
    );
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen w-[280px]
          bg-white/95 backdrop-blur-xl
          border-r border-border/50
          shadow-xl md:shadow-none
          transition-transform duration-300
          flex flex-col
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-2xl p-3 shadow-md">
              <BookOpen className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="font-bold text-xl tracking-tight">
                EducaPlus
              </h1>

              <p className="text-xs text-muted-foreground">
                Plataforma Educacional
              </p>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="px-4 pt-6">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-4 border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white rounded-xl w-12 h-12 flex items-center justify-center font-semibold text-lg shadow-sm">
                {user?.name?.charAt(0)}
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">
                  {user?.name}
                </p>

                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-primary font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Aprendizado ativo
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className={`
                group flex items-center gap-3
                px-4 py-3 rounded-2xl
                transition-all duration-200
                font-medium
                ${
                  isActive(item.path)
                    ? "bg-primary text-white shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              <item.icon className="w-5 h-5" />

              <span className="text-sm">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border/50 space-y-2">
          <Link
            to="/app/profile"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className={`
              flex items-center gap-3
              px-4 py-3 rounded-2xl
              transition-all duration-200
              font-medium
              ${
                isActive("/app/profile")
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
          >
            <User className="w-5 h-5" />

            <span className="text-sm">
              Perfil
            </span>
          </Link>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 rounded-2xl h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />

            <span className="text-sm">
              Sair
            </span>
          </Button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-border/50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-xl p-2">
              <BookOpen className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="font-bold">
                EducaPlus
              </h1>

              <p className="text-xs text-muted-foreground">
                Painel Educacional
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
