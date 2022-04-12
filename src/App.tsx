import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import getAccessToken from './api/getAccessToken';
import getVisibilityData from './api/getVisibilityData';

export default function App() {
    const [domain, setDomain] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [data, setData] = useState('');

    useEffect(() => {
        (async () => {
            const response = await getAccessToken();
            if (response.success) setToken(response.data.token);
        })();
    }, []);

    useEffect(() => {
        if (!token) return;
        if (process.env.NODE_ENV === 'development') setDomain('senuto.com');
        if (process.env.NODE_ENV === 'production')
            chrome.tabs.query(
                { active: true, lastFocusedWindow: true },
                (tabs) => {
                    if (!tabs || !tabs[0] || !tabs[0].url) return;
                    const { url } = tabs[0];
                    try {
                        const parsed = new URL(url);
                        if (parsed.protocol.match(/^https?:$/))
                            setDomain(parsed.hostname);
                    } catch (err: any) {
                        console.error(err.message);
                    }
                }
            );
    }, [token]);

    useEffect(() => {
        (async () => {
            if (!domain || !token) return;
            setData(await getVisibilityData(token, domain));
        })();
    }, [domain]);

    return (
        <div className={styles.App}>
            <pre>{data}</pre>
        </div>
    );
}
