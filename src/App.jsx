import React, { useState } from "react";
import BookingFlow from "./components/BookingFlow";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div>
      <h1>Pacer</h1>
      {!isLoggedIn ? (
        <Login onLoginSuccess={function () {
          setIsLoggedIn(true);
        }} />
      ) : (
        <BookingFlow />
      )}
    </div>
  );
}

export default App;
