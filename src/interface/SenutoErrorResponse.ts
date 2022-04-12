export default interface SenutoTokenResponse {
    success: false;
    data: {
        error: {
            type: 'unauthorized';
            message: string;
        };
    };
}
