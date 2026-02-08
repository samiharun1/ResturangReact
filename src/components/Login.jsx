
/*
Den här komponenten hanterar admin-inloggning i React.
Användaren skriver in användarnamn och lösenord som skickas till backend-API:t.
Om inloggningen lyckas får vi en JWT-token som sparas i localStorage.
Token används senare för att komma åt skyddade delar av applikationen.
Om inloggningen misslyckas visas ett tydligt felmeddelande.
*/


// Vi importerar React och useState från React
// useState används för att komma ihåg saker, t.ex. vad användaren skriver
import React, { useState } from "react";

// Login är en React-komponent
// props används för att ta emot funktioner/data från föräldrakomponenten
function Login(props) {

  // Här sparar vi användarnamnet som användaren skriver
  const [username, setUsername] = useState("");

  // Här sparar vi lösenordet som användaren skriver
  const [password, setPassword] = useState("");

  // Här sparar vi eventuella felmeddelanden (t.ex. fel lösenord)
  const [error, setError] = useState("");

  // Den här funktionen körs när man klickar på "Logga in"
  function handleLogin() {

    // Vi nollställer tidigare felmeddelanden
    setError("");

    // Vi skickar ett POST-anrop till backend-API:t
    // Det är här React pratar med ASP.NET API:t
    fetch("https://localhost:7179/api/Auth/login", {
      method: "POST", // POST betyder: skicka data
      headers: {
        "Content-Type": "application/json" // Vi skickar JSON-data
      },
      // Här skickar vi användarnamn och lösenord till API:t
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

      // När API:t svarar
      .then(function (res) {

        // Om inloggningen misslyckas (t.ex. fel lösenord)
        if (!res.ok) {
          throw new Error("Fel användarnamn eller lösenord");
        }

        // Om allt gick bra → läs svaret som JSON
        return res.json();
      })

      // Här får vi tillbaka datan från API:t
      .then(function (data) {

        // Vi sparar JWT-token i webbläsaren
        // Den används senare för skyddade API-anrop
        localStorage.setItem("token", data.token);

        // Vi säger till föräldrakomponenten att inloggningen lyckades
        props.onLoginSuccess();
      })

      // Om något går fel under processen
      .catch(function (err) {

        // Visa felmeddelandet på skärmen
        setError(err.message);
      });
  }

  // Det här är HTML-koden som visas på sidan
  return (
    <div>
      <h2>Login</h2>

      {/* Inputfält för användarnamn */}
      <input
        type="text"
        placeholder="Användarnamn"
        value={username} // värdet kommer från state
        onChange={function (e) {
          // När användaren skriver uppdateras state
          setUsername(e.target.value);
        }}
      />

      {/* Inputfält för lösenord */}
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={function (e) {
          setPassword(e.target.value);
        }}
      />

      <br />

      {/* Knapp som kör handleLogin-funktionen */}
      <button onClick={handleLogin}>Logga in</button>

      {/* Om det finns ett fel → visa det i rött */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

// Gör komponenten tillgänglig för resten av appen
export default Login;
