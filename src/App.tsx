import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import { UserContextProvider } from "./context/userContext";
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
