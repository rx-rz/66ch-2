import "./App.css";
import { AppRoutes } from "./routes";
import AppProvider from "./provider/app";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
