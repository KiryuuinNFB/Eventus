import { json } from '@sveltejs/kit';
import { API_ELYSIA } from "$lib/config";

export async function POST({ request, cookies, fetch }) {
    const { username, password } = await request.json()

    const res = await fetch(`${API_ELYSIA}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ username, password }),
    });
    
    if (!res.ok) {
        return json({ status: res.status });
    }

    const { token } = await res.json();

    cookies.set('jwt', token, {
		httpOnly: true,
        secure: false,
		path: '/',
		sameSite: 'strict',
		maxAge: 60 * 60
	});

    return json({ "token": token });

};
