import { API_ELYSIA } from "$lib/config";
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url, fetch }) => {
    const token = cookies.get('jwt')
    if (!token) {
        redirect(307, "/")
    }

    const hasQueryParams = url.searchParams.size > 0;

    let apiUrl: string;

    if (hasQueryParams) {
        const page = Number(url.searchParams.get('page')) || 1;
        const grade = url.searchParams.get('grade') || "";
        const room = url.searchParams.get('room') || "";
        const search = url.searchParams.get('search') || "";

        const params = new URLSearchParams();
        params.set('page', page.toString());
        if (grade) params.set('grade', grade);
        if (room) params.set('room', room);
        if (search) params.set('search', search);

        apiUrl = `${API_ELYSIA}/admin/database/user?${params.toString()}`;
    } else {
        apiUrl = `${API_ELYSIA}/admin/database/user`;
    }

    const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
    });
    const data = await res.json()

    return {
        "data": data.data,
        "page": data.page,
        "total": data.total,
        "pageCount": data.pageCount,
        "token": token
    }

}