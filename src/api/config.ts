import PORT from '../server/PORT';

const config = {
    origin:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:' + PORT
            : 'http://localhost:' + PORT
};
export default config;
