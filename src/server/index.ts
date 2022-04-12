import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import FormData from 'form-data';
import GetTokenRequest from '../interface/GetTokenRequest';
import SenutoTokenResponse from '../interface/SenutoTokenResponse';
import SenutoErrorResponse from '../interface/SenutoErrorResponse';
const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

app.post('/token', async (req, res) => {
    const { email, password } = <GetTokenRequest>req.body;
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

app.post('/visibility', async (req, res) => {
    const { token, domain } = req.body;
    const response = await fetch(
        `https://api.senuto.com/api/visibility_analysis/reports/domain_positions/getPositionsHistoryChartData?domain=${domain}&fetch_mode=subdomain&country_id=1&type=undefined&date_min=2015-09-15&date_max=2022-04-12&date_interval=weekly`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Lang: 'pl-PL'
            },
            redirect: 'follow'
        }
    ).then((res) => res.json());
    res.send(response);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
