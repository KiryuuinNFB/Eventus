import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_ELYSIA } from '$lib/config';

export const load: PageServerLoad = async ( {cookies} ) => {
    const token = cookies.get('jwt')
    const user = cookies.get('user')
    if (!token) {
        redirect(307, "/")
    }
    const data = {
        "user": user
    }
    return data
}