import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import getAccessToken from './api/getAccessToken';

export default function App() {
    const [domain, setDomain] = useState<string | null>(null);
    useEffect(() => {
        (async () => {
            await getAccessToken();
        })();
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
    }, []);

    return <div className={styles.App}>Hello {domain}</div>;
}
