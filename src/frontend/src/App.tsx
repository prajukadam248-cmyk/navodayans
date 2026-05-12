import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const HomePage = lazy(() => import("@/pages/Home"));
const SubjectsPage = lazy(() => import("@/pages/Subjects"));
const SubjectDetailPage = lazy(() => import("@/pages/SubjectDetail"));
const TutorPage = lazy(() => import("@/pages/Tutor"));
const QuizPage = lazy(() => import("@/pages/Quiz"));
const ProgressPage = lazy(() => import("@/pages/Progress"));
const SettingsPage = lazy(() => import("@/pages/Settings"));

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48 rounded-xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

// Route definitions
const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => withSuspense(HomePage),
});

const subjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subjects",
  component: () => withSuspense(SubjectsPage),
});

const subjectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subjects/$subjectId",
  component: () => withSuspense(SubjectDetailPage),
});

const tutorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tutor",
  component: () => withSuspense(TutorPage),
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: () => withSuspense(QuizPage),
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: () => withSuspense(ProgressPage),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => withSuspense(SettingsPage),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  subjectsRoute,
  subjectDetailRoute,
  tutorRoute,
  quizRoute,
  progressRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export default function App() {
  return <RouterProvider router={router} />;
}
