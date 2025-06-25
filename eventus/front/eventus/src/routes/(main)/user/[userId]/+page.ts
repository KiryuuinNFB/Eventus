import type { PageLoad } from './$types';
import { API_ELYSIA } from '$lib/config';

export const load: PageLoad = async ({ fetch, params }) => {

    const getuser = async (id: string) => {
        const response = await fetch(`${API_ELYSIA}/dev/user/${id}`, {
            method: "GET",
            headers: {}
        })
        const data = await response.json()
        return data
    }

    const getbase = async () => {
        const response = await fetch(`${API_ELYSIA}/dev/base/`, {
            method: "GET",
            headers: {}
        })
        const data = await response.json()
        return data
    }
    return {
        user: await getuser(params.userId),
        base: await getbase()
    }
}