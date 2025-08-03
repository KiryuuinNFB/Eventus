import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { API_ELYSIA } from "$lib/config";

export async function GET({  cookies, fetch }) {
    const token = cookies.get('jwt')

    if (!token) {
            redirect(307, "/")
        }

    const res = await fetch(`${API_ELYSIA}/cert/`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            "authorization": token,
        }
    });
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    return json({ "img" : url })
}