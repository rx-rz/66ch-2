import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {LoginForm} from "./features/auth/components/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
