import { lazy, Suspense } from "react";
import { Outlet, createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import Header from "../components/header/Header";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Account = lazy(() => import("../pages/Account"));
const Standings = lazy(() => import("../pages/Standings"));
const Scores = lazy(() => import("../pages/Scores"));
const Predict = lazy(() => import("../pages/Predict/Predict"));
const Matches = lazy(() => import("../pages/Matches"));
const PredictGroup = lazy(() => import("../pages/Predict/PredictGroup"));
const PredictMatch = lazy(() => import("../pages/Predict/PredictMatch"));
const PredictKnockoutStart = lazy(() => import("../pages/Predict/PredictKnockoutStart"));

const TanStackRouterDevtools = lazy(() =>
  import("@tanstack/react-router-devtools").then((module) => ({
    default: module.TanStackRouterDevtools,
  })),
);

const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then((module) => ({
    default: module.ReactQueryDevtools,
  })),
);

export const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={null}>
      <Header />
      <Outlet />
      {import.meta.env.VITE_DEV === "true" && (
        <Suspense fallback={null}>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </Suspense>
      )}
    </Suspense>
  ),
});

const routes = [
  { path: "/", component: Home },

  { path: "/matches", component: Matches },
  { path: "/standings", component: Standings },

  { path: "/predict", component: Predict },
  { path: "/predict/group", component: PredictGroup },
  { path: "/predict/knockout-start", component: PredictKnockoutStart },
  // { path: "/predict/knockout", component: PredictKnockoutStart },
  { path: "/predict/match", component: PredictMatch },
  { path: "/scores", component: Scores },

  { path: "/login", component: Login },
  { path: "/account", component: Account },
];

const routeTree = rootRoute.addChildren(
  routes.map(({ path, component }) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
      component,
    }),
  ),
);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
