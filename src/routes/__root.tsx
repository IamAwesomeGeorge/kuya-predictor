import { Outlet, createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../components/header/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Account from "../pages/Account";
import Standings from "../pages/Standings";
import Scores from "../pages/Scores";
import Predict from "../pages/Predict/Predict";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      {import.meta.env.VITE_DEV === "true" && (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      )}
    </>
  ),
});

const routes = [
  { path: "/", component: Home },
  { path: "/predict", component: Predict },
  { path: "/standings", component: Standings },
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
