import React, { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, User } from "./api/userApi";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if(!name.trim() || !email.trim()) {
      alert("Name ja email peavad olema täidetud");
      return;
    }

    await createUser({ name, email });
    await loadUsers();
    setName("");
    setEmail("");
  }

  async function handleDelete(id:number) {
    await deleteUser(id);
    await loadUsers();
  }

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Users</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add user</button>
      </form>

      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.name} — {u.email}
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;