import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { API_ELYSIA } from "$lib/config";

export async function GET({ cookies, fetch }) {
    const token = cookies.get('jwt')
    const user = cookies.get('user')
        
    if (!token) {
            redirect(307, "/")
        }

    const res = await fetch(`${API_ELYSIA}/cert/${user}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
        }
    });
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'no-cache'
        }
    });
}