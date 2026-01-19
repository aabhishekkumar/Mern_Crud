import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [listOfUser, setListOfUser] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  // Fetch users
  useEffect(() => {
    axios
      .get("http://localhost:9000/getUsers")
      .then((response) => {
        setListOfUser(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Add new user
  const addUser = () => {
    axios
      .post("http://localhost:9000/createUser", {
        name,
        age,
        email,
        number,
      })
      .then((response) => {
        // Option 1: re-fetch users
        return axios.get("http://localhost:2001/getUsers");
      })
      .then((response) => {
        setListOfUser(response.data);
        setName("");
        setAge("");
        setEmail("");
        setNumber("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1>Users List</h1>

      {listOfUser.map((user) => (
        <div
          key={user._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <p>
            <strong>ID:</strong> {user._id}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Number:</strong> {user.number}
          </p>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age..."
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
};

export default App;
