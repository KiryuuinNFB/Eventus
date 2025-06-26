import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_ELYSIA } from '$lib/config';

export const load: PageServerLoad = async ({ params, cookies }) => {
    const username = params.userId
    const token = cookies.get('jwt')
    if (!token) {
        redirect(307, "/")
    }
    const res = await fetch(`${API_ELYSIA}/auth/verify`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "authorization": token
        },
        body: JSON.stringify({username})
    })

    if (!res.ok) {
        redirect(303, "/")
    }
}