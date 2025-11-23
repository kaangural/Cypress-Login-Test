// src/App.jsx
import { useState } from "react";
import Login from "./components/login.jsx";
import Success from "./components/success.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Success />;
  }

  return <Login onSuccess={() => setIsLoggedIn(true)} />;
}

export default App;
