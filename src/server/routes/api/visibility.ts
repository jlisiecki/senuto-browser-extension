import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

export default router.post('/visibility', async (req, res) => {
    const { token, domain } = req.body;
    const response = await fetch(
        `https://api.senuto.com/api/visibility_analysis/reports/domain_positions/getPositionsHistoryChartData?domain=${domain}&fetch_mode=subdomain&country_id=1&type=undefined&date_min=2015-09-15&date_max=${
            new Date().toISOString().split('T')[0]
        }&date_interval=weekly`,
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
