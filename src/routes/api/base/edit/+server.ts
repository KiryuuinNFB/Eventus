import { json } from '@sveltejs/kit';
import { API_ELYSIA } from "$lib/config";

export async function PATCH({ request, cookies, fetch }) {
    const {
        id,
        name,
        desc,
        location,
        teacher
    } = await request.json()
    const token = cookies.get('jwt')

    if (!token) {
        return json({ "status": 401 })
    }

    const res = await fetch(`${API_ELYSIA}/admin/base`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": token,
        },
        body: JSON.stringify({
            id,
            name,
            desc,
            location,
            teacher
        }),
    });


    return json({ "status" : res.status })
}