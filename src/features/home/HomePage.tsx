import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/utils/firebaseConfig";
export default function HomePage() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
      </div>
    );
  }
  return (<p>Sup</p>)
}
