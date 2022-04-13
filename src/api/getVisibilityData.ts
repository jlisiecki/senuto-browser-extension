import fetch from 'node-fetch';
import config from './config';
export default async function getVisibilityData(token: string, domain: string) {
    return await fetch(config.origin + '/api/visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, domain })
    })
        .then((res) => res.text())
        .then((res: string) => res)
        .catch((err) => err.message);
}
