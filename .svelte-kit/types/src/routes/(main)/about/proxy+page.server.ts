// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_ELYSIA } from '$lib/config';

export const load = async ( {cookies}: Parameters<PageServerLoad>[0] ) => {
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