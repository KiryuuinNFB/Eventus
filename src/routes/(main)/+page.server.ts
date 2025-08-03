import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('jwt')
    const user = cookies.get('user')
    if (!token) {
        redirect(307, "/login")
    } else {
        redirect(307, `/user/${user}`)
    }
    
}            