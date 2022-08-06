import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {LoginForm} from "./features/auth/components/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterForm from "./features/auth/components/RegisterForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm/>}/>
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
