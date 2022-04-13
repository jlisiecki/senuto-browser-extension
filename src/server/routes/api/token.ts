import { Router } from 'express';
import fetch from 'node-fetch';
import FormData from 'form-data';
import GetTokenRequest from '../../../interface/GetTokenRequest';
import SenutoErrorResponse from '../../../interface/SenutoErrorResponse';
import SenutoTokenResponse from '../../../interface/SenutoErrorResponse';

const router = Router();

export default router.post('/token', async (req, res) => {
    const { email, password }: GetTokenRequest = req.body;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const response = await fetch('https://api.senuto.com/api/users/token', {
        method: 'POST',
        body: formData
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
    res.send(response);
});
