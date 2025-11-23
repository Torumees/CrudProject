export interface User {
    id: number;
    name: string;
    email: string;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

const API_URL = "http://127.0.0.1:8080/users"

export async function getUsers(page = 0, size = 5): Promise<PageResponse<User>> {
    const res = await fetch(`${API_URL}?page=${page}&size=${size}`);
    if(!res.ok) {
        throw new Error("Failed to fetch users");
    }
    return res.json();
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(user),
    });
    return res.json();
}

export async function deleteUser(id:number): Promise<void> {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
}

export async function updateUser(id:number, user: Omit<User, "id">): Promise<User> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return res.json();
}