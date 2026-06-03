import { lazy, Suspense } from "react";

import { createBrowserRouter, Navigate } from "react-router";

import { PrivateRoute } from "./routes/PrivateRoute";

import { LoadingState } from "../shared/components/LoadingState";

/**
 * AUTH
 */
const Login = lazy(() => import("./pages/Login"));

const Register = lazy(() => import("./pages/Register"));

/**
 * CORE
 */
const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));

const Dashboard = lazy(() => import("./pages/Dashboard"));

const Profile = lazy(() => import("./pages/Profile"));

/**
 * MODULES
 */
const Diagnosis = lazy(() => import("./pages/Diagnosis"));

const LearningPaths = lazy(() => import("./pages/LearningPaths"));

const LearningPathDetail = lazy(() => import("./pages/LearningPathDetail"));

const Planner = lazy(() => import("./pages/Planner"));

const Library = lazy(() => import("./pages/Library"));

const Diary = lazy(() => import("./pages/Diary"));

/**
 * ANALYTICS
 */
const Analytics = lazy(() => import("../modules/analytics/AnalyticsPage"));

/**
 * HELPERS
 */
function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<LoadingState />}>{element}</Suspense>;
}

/**
 * ROUTER
 */
export const router = createBrowserRouter([
  /**
   * ROOT
   */
  {
    path: "/",

    element: <Navigate to="/login" replace />,
  },

  /**
   * AUTH
   */
  {
    path: "/login",

    element: withSuspense(<Login />),
  },

  {
    path: "/register",

    element: withSuspense(<Register />),
  },

  /**
   * DIAGNOSIS PUBLIC
   */
  {
    path: "/diagnosis",

    element: withSuspense(<Diagnosis />),
  },

  /**
   * APP
   */
  {
    path: "/app",

    element: withSuspense(
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>,
    ),

    children: [
      /**
       * DASHBOARD
       */
      {
        index: true,

        element: withSuspense(<Dashboard />),
      },

      /**
       * LEARNING PATHS
       */
      {
        path: "learning-paths",

        element: withSuspense(<LearningPaths />),
      },

      {
        path: "learning-paths/:id",

        element: withSuspense(<LearningPathDetail />),
      },

      /**
       * PLANNER
       */
      {
        path: "planner",

        element: withSuspense(<Planner />),
      },

      /**
       * LIBRARY
       */
      {
        path: "library",

        element: withSuspense(<Library />),
      },

      /**
       * DIARY
       */
      {
        path: "diary",

        element: withSuspense(<Diary />),
      },

      /**
       * PROFILE
       */
      {
        path: "profile",

        element: withSuspense(<Profile />),
      },

      /**
       * ANALYTICS
       * COORDINATOR ONLY
       */
      {
        path: "analytics",

        element: withSuspense(
          <PrivateRoute allowedRoles={["COORDINATOR", "ADMIN"]}>
            <Analytics />
          </PrivateRoute>,
        ),
      },

      /**
       * SPECIAL EDUCATION
       */
      {
        path: "diagnosis",

        element: withSuspense(
          <PrivateRoute allowedRoles={["SPECIAL_ED", "ADMIN"]}>
            <Diagnosis />
          </PrivateRoute>,
        ),
      },
    ],
  },

  /**
   * FALLBACK
   */
  {
    path: "*",

    element: (
      <div className="flex min-h-screen items-center justify-center bg-muted/20 p-6">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-xl border text-center">
          <h1 className="text-5xl font-bold">404</h1>

          <p className="mt-4 text-muted-foreground">Página não encontrada.</p>
        </div>
      </div>
    ),
  },
]);
