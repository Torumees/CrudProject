// frontend/src/App.tsx

import React, { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, updateUser, User, PageResponse } from "./api/userApi";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 5;

  async function loadUsers(targetPage: number) {
    try {
      const data: PageResponse<User> = await getUsers(targetPage, pageSize);
      setUsers(data.content);
      setPage(data.number);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
      alert("Kasutajate laadimine ebaõnnestus");
    }
  }

  useEffect(() => {
    loadUsers(0);
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
      setEditingUser(null);
    } else {
      // CREATE
      await createUser({ name, email });
    }

    await loadUsers(0);
    setName("");
    setEmail("");
  }

  async function handleDelete(id: number) {
    await deleteUser(id);
    await loadUsers(0);
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

  function handleNext() {
    if (page < totalPages - 1) {
      loadUsers(page + 1);
    }
  }

  function handlePrev() {
    if (page > 0) {
      loadUsers(page - 1);
    }
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

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handlePrev} disabled={page === 0}>
          Previous
        </button>
        <span style={{ margin: "0 0.5rem" }}>
          Page {page + 1} / {totalPages || 1}
        </span>
        <button onClick={handleNext} disabled={page >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
