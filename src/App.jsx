// src/App.jsx
import { useState } from "react";
import Login from "./components/Login";
import Success from "./components/Success";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Success />;
  }

  return <Login onSuccess={() => setIsLoggedIn(true)} />;
}

export default App;
