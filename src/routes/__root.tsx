import { Outlet, createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../components/header/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Account from "../pages/Account";
import Standings from "../pages/Standings";
import Scores from "../pages/Scores";

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
  { path: "/login", component: Login },
  { path: "/account", component: Account },
  { path: "/standings", component: Standings },
  { path: "/scores", component: Scores },
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
