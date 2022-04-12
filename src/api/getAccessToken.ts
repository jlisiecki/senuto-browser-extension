import fetch from 'node-fetch';
import SenutoErrorResponse from '../interface/SenutoErrorResponse';
import SenutoTokenResponse from '../interface/SenutoTokenResponse';
import credentials from './credentials';
export default async function getAccessToken(): Promise<
    SenutoTokenResponse | SenutoErrorResponse
> {
    return await fetch('http://localhost:3300/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
        .then((res) => res.json())
        .then((res: SenutoTokenResponse | SenutoErrorResponse) => res)
        .catch((err) => {
            const errorResponse: SenutoErrorResponse = {
                success: false,
                data: {
                    error: {
                        type: 'unauthorized',
                        message: err.message
                    }
                }
            };
            return errorResponse;
        });
}
