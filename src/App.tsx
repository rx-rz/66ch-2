import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import { UserContextProvider } from "./context/userContext";
import { PostContextProvider } from "./context/postContext";
function App() {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PostContextProvider>
    </UserContextProvider>
  );
}

export default App;
