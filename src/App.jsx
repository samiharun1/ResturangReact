import React, { useState } from "react";
import BookingFlow from "./components/BookingFlow";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div>
      <h1>Restaurangbokning</h1>
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
