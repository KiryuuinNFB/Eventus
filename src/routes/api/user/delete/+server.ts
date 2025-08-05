import { json } from '@sveltejs/kit';
import { API_ELYSIA } from "$lib/config";

export async function DELETE({ request, cookies, fetch }) {
    const {
        username,
        password
    } = await request.json()
    const token = cookies.get('jwt')

    if (!token) {
        return json({ "status": 401 })
    }

    const res = await fetch(`${API_ELYSIA}/admin/user`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": token,
        },
        body: JSON.stringify({
            username,
            password
        }),
    });


    return json({ "status": res.status })
}