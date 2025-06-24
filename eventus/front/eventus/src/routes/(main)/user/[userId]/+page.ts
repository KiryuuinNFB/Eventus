import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {

    const getuser = async (id: string) => {
        const response = await fetch(`http://172.50.87.37:3000/dev/user/${id}`, {
            method: "GET",
            headers: {}
        })
        const data = await response.json()
        return data
    }

    return {
        user: await getuser(params.userId)
    }
}