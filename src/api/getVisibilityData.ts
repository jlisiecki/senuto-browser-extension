import fetch from 'node-fetch';
export default async function getVisibilityData(token: string, domain: string) {
    return await fetch('http://localhost:3300/visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, domain })
    })
        .then((res) => res.text())
        .then((res: string) => res)
        .catch((err) => err.message);
}
