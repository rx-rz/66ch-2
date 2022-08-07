import "./App.css";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { LoginForm } from "./features/auth/components/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./routes";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>

    </QueryClientProvider>
  );
}

export default App;
