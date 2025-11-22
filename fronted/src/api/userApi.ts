export interface User {
    name: string;
    email: string;
}

const API_URL = "http://127.0.0.1:8080/users"

export async function getUsers(): Promise<User[]> {
    const res = await fetch(API_URL);
    return res.json();
}

export async function createUser(user:User): Promise<void> {
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(user),
    });
}