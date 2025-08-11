import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_ELYSIA } from '$lib/config';

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('jwt')
    const user = cookies.get('user')
    if (!token || !user) {
        redirect(307, "/")
    }
    const res = await fetch(`${API_ELYSIA}/auth/veriadmin`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            "authorization": token
        },
    })

    if (!res.ok) {
        redirect(303, "/")
    }

    const getuser = async (id: string) => {
        const response = await fetch(`${API_ELYSIA}/api/v1/user/${id}`, {
            method: "GET",
            headers: { 
            "Content-Type": "application/json", 
            "authorization": token
        },
        })
        const data = await response.json()
        return data
    }

    const data = getuser(user)
    return data
}