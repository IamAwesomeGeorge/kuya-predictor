import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, StrictMode, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/__root";
import { UserProvider } from "./contexts/UserProvider";
import { TeamsProvider } from "./contexts/TeamsProvider";

const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  })),
);

const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((module) => ({
    default: module.Analytics,
  })),
);

const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then((module) => ({
    default: module.SpeedInsights,
  })),
);

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <TeamsProvider>
            <RouterProvider router={router} />
            <Suspense fallback={null}>
              <ToastContainer />
              <Analytics />
              <SpeedInsights />
            </Suspense>
          </TeamsProvider>
        </UserProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
