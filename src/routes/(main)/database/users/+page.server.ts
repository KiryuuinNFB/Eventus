import { API_ELYSIA } from "$lib/config";
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url, fetch }) => {
    const token = cookies.get('jwt')
    if (!token) {
        redirect(307, "/")
    }

    const page = Number(url.searchParams.get('page')) || 1;

    const params = new URLSearchParams({
        page: page.toString(),
    });

    const res = await fetch(`${API_ELYSIA}/admin/database/user?${params.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
    })

    const data = await res.json()

    return {
        "data": data.data,
        "page": data.page,
        "total":data.total,
        "pageCount": data.pageCount,
        "token": token
    }

}