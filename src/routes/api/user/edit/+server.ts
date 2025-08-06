import { json } from '@sveltejs/kit';
import { API_ELYSIA } from "$lib/config";

export async function PATCH({ request, cookies, fetch }) {
    const {
        username,
        password,
        name,
        surname,
        role,
        prefix,
        grade,
        room
    } = await request.json()
    const token = cookies.get('jwt')

    if (!token) {
        return json({ "status": 401 })
    }

    const res = await fetch(`${API_ELYSIA}/admin/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": token,
        },
        body: JSON.stringify({
            username,
            password,
            name,
            surname,
            role,
            prefix,
            grade,
            room
        }),
    });


    return json({ "status" : res.status })
}