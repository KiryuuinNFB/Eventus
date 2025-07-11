import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { API_ELYSIA } from "$lib/config";

export async function POST({ request, cookies, fetch }) {
    const { user, base } = await request.json()
    const token = cookies.get('jwt')

    if (!token) {
            redirect(307, "/")
        }

    const res = await fetch(`${API_ELYSIA}/admin/approve/${user}/${base}`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "authorization": token,
        }
    });

    return json({"status": res.status})
}