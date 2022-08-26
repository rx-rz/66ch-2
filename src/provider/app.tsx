import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { PostContextProvider, UserContextProvider } from "src/context";
import ThemeContextProvider from "src/context/themeContext";
type AppProviderProps = {
  children: React.ReactNode;
};
export default function AppProvider({ children }: AppProviderProps) {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <ThemeContextProvider>
          <Router>
            <>{children}</>
          </Router>
        </ThemeContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  );
}
