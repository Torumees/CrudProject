// frontend/src/App.tsx

import React, { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, updateUser, User } from "./api/userApi";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null); // <-- kas oleme "edit mode'is"?

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Nimi ja email peavad olema täidetud");
      return;
    }

    if (editingUser) {
      // UPDATE
      await updateUser(editingUser.id, { name, email });
      setEditingUser(null); // väljumine edit-mode'ist
    } else {
      // CREATE
      await createUser({ name, email });
    }

    await loadUsers();
    setName("");
    setEmail("");
  }

  async function handleDelete(id: number) {
    await deleteUser(id);
    await loadUsers();
  }

  function handleEdit(user: User) {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  }

  function handleCancelEdit() {
    setEditingUser(null);
    setName("");
    setEmail("");
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
        <button type="submit">
          {editingUser ? "Update user" : "Add user"}
        </button>
        {editingUser && (
          <button type="button" onClick={handleCancelEdit} style={{ marginLeft: "0.5rem" }}>
            Cancel
          </button>
        )}
      </form>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} — {u.email}{" "}
            <button onClick={() => handleEdit(u)}>Edit</button>{" "}
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
