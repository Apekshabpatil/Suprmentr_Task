import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Connect the Stack</h1>

      {users.map((user, index) => (
        <p key={index}>{user.name}</p>
      ))}
    </div>
  );
}

export default App;