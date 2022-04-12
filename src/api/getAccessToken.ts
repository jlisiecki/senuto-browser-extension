import credentials from './credentials';
export default async function getAccessToken(): Promise<string> {
    const { email, password } = credentials;
    const body = new FormData();
    body.append('email', email);
    body.append('password', password);
    const response = await fetch('https://api.senuto.com/api/users/token', {
        method: 'POST',
        mode: 'no-cors',
        headers: { Lang: 'pl-PL' },
        body
    }).then((res) => res.text());
    console.log(response);
    return '';
}
