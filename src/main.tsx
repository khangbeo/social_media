import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";

// Create a new QueryClient instance which will be used to manage the state of queries and mutations
// This is necessary for the React Query library to function properly
// It allows us to cache data, manage background updates, and handle loading states across our application
// The QueryClientProvider component will provide this client to all components in the app that need to use React Query
// This is typically done at the root of the application to ensure all components can access the query client
// The QueryClientProvider wraps the entire application, allowing any component to use the useQuery or useMutation hooks
// This setup is essential for managing server state in a React application efficiently

// AuthProvider is used to provide authentication context to the entire application
// It allows components to access user authentication state and methods for signing in and out
// This is particularly useful for managing user sessions and protecting routes that require authentication
const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <AuthProvider>
                <Router>
                    <App />
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);
