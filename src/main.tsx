import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/__root";
import { UserProvider } from "./contexts/UserProvider";
import { TeamsProvider } from "./contexts/TeamsProvider";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { PulseProvider } from "./contexts/PulseProvider";

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
            <PulseProvider>
              <RouterProvider router={router} />
              <ToastContainer />
              {/* Analytics */}
              <Analytics />
              <SpeedInsights />
            </PulseProvider>
          </TeamsProvider>
        </UserProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
