export const load = ({ fetch, params }) => {

    const getuser = async (id: string) => {
        const response = await fetch(`http://localhost:3000/dev/user/${id}`, {
            method: "GET",
            headers: {}
        })
        const data = await response.json()
        return data
    }

    return {
        user: getuser(params.userId)
    }
}