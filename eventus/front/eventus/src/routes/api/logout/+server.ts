import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
    cookies.delete('jwt', { path: '/' })
    return json({ "logout": true });
}