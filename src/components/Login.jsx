import React, { useState } from "react";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    setError("");

    fetch("https://localhost:7179/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Fel användarnamn eller lösenord");
        }
        return res.json();
      })
      .then(function (data) {
        localStorage.setItem("token", data.token);
        props.onLoginSuccess();
      })
      .catch(function (err) {
        setError(err.message);
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={function (e) {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={function (e) {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={handleLogin}>Logga in</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
