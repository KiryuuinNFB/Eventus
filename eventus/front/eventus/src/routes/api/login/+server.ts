export async function POST({ request }) {
    const body = await request.json();

    const res = await fetch('http://192.168.1.34:3000/auth/login', {
        method: 'POST',
        headers: {
            'Accept': "*/*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
		status: res.status,
		headers: {
            'Accept': "*/*",
            'Content-Type': 'application/json'
        },
	});
}
