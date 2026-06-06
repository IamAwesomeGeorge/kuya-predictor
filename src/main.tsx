import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/__root";
import { UserProvider } from "./contexts/UserProvider";
import { TeamsProvider } from "./contexts/TeamsProvider";
import { ToastContainer } from "react-toastify";

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
          </TeamsProvider>
          <ToastContainer />
        </UserProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
