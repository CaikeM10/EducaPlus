import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { PrivateRoute } from "./routes/PrivateRoute";
import { LoadingState } from "../shared/components/LoadingState";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Diagnosis = lazy(() => import("./pages/Diagnosis"));
const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const LearningPaths = lazy(() => import("./pages/LearningPaths"));
const LearningPathDetail = lazy(() => import("./pages/LearningPathDetail"));
const Planner = lazy(() => import("./pages/Planner"));
const Library = lazy(() => import("./pages/Library"));
const Diary = lazy(() => import("./pages/Diary"));
const Profile = lazy(() => import("./pages/Profile"));

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<LoadingState />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/register",
    element: withSuspense(<Register />),
  },
  {
    path: "/diagnosis",
    element: withSuspense(<Diagnosis />),
  },
  {
    path: "/app",
    element: withSuspense(
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>,
    ),
    children: [
      {
        index: true,
        element: withSuspense(<Dashboard />),
      },
      {
        path: "learning-paths",
        element: withSuspense(<LearningPaths />),
      },
      {
        path: "learning-paths/:id",
        element: withSuspense(<LearningPathDetail />),
      },
      {
        path: "planner",
        element: withSuspense(<Planner />),
      },
      {
        path: "library",
        element: withSuspense(<Library />),
      },
      {
        path: "diary",
        element: withSuspense(<Diary />),
      },
      {
        path: "profile",
        element: withSuspense(<Profile />),
      },
    ],
  },
]);
