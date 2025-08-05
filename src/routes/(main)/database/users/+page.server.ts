import { API_ELYSIA } from "$lib/config";
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const page = 1
    const token = cookies.get('jwt')
    if (!token) {
        redirect(307, "/")
    }
    const res = await fetch(`${API_ELYSIA}/admin/database/user/${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
    })

    const data = await res.json()
    console.log(data)
    
    return {"result" : data}
    
}