import fetch from 'node-fetch';
import SenutoErrorResponse from '../interface/SenutoErrorResponse';
import SenutoTokenResponse from '../interface/SenutoTokenResponse';
import config from './config';
import credentials from './credentials';
export default async function getAccessToken(): Promise<
    SenutoTokenResponse | SenutoErrorResponse
> {
    return await fetch(config.origin + '/api/token', {
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
