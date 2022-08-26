import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { PostContextProvider, UserContextProvider } from "src/context";
type AppProviderProps = {
  children: React.ReactNode;
};
export default function AppProvider({ children }: AppProviderProps) {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <Router>
          <>{children}</>
        </Router>
      </PostContextProvider>
    </UserContextProvider>
  );
}
