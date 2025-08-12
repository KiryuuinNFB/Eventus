import { json } from '@sveltejs/kit';
import { API_ELYSIA } from "$lib/config";

export async function GET({ cookies, fetch, params }) {
    const token = cookies.get('jwt')

    if (!token) {
        return json({ "status": 401 })
    }

    const res = await fetch(`${API_ELYSIA}/admin/database/user/completion/${params.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token,
        },
    });

    return res
}