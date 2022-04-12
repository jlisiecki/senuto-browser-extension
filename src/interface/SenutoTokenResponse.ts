export default interface SenutoTokenResponse {
    success: true;
    data: {
        token: string;
        id: number;
        email: string;
        lang: string;
        currency: string;
        currency_ratio: number;
        country_id: number;
    };
}
