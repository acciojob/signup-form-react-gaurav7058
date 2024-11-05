import React, { useState } from "react";
import '../styles/App.css';

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male"); // Default to "male" as required
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState(""); // State for greeting message

  const isValidName = (str) => /^[a-zA-Z0-9 ]+$/.test(str); // Check alphanumeric with spaces

  function FormHandler(e) {
    e.preventDefault();

    // Check if any field is empty
    if (!name || !email || !gender || !number || !password) {
      setError("All fields are mandatory");
      setGreeting("");
      return;
    }

    // Validate name
    if (!isValidName(name)) {
      setError("Name is not alphanumeric.");
      setGreeting("");
      return;
    }

    // Validate email
    if (!email.includes("@")) {
      setError("Email must contain @.");
      setGreeting("");
      return;
    }

    // Validate gender
    if (!["male", "female", "other"].includes(gender)) {
      setError("Please identify as male, female or others.");
      setGreeting("");
      return;
    }

    // Validate phone number
    if (isNaN(number)) {
      setError("Phone Number must contain only numbers.");
      setGreeting("");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must contain at least 6 letters.");
      setGreeting("");
      return;
    }

    // Extract username from email and set greeting
    const username = email.split("@")[0];
    setGreeting(`Hello ${username}`);
    setError(""); // Clear error if all validations pass
  }

  return (
    <div id="main" className="container">
      <form onSubmit={FormHandler}>
        <div>
          <input
            type="text"
            data-testid="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
        </div>
        <input
          type="text"
          data-testid="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <select
          data-testid="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <input
          type="text"
          data-testid="phoneNumber"
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <input
          type="password"
          data-testid="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" data-testid="submit">Submit</button>
        
        {/* Error message */}
        {error && <div className="error" style={{ color: "red" }}><span>{error}</span></div>}

        {/* Greeting message */}
        {greeting && <div className="greeting"><h2>{greeting}</h2></div>}
      </form>
    </div>
  );
};

export default App;
