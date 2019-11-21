const development = {
    API_URL: 'http://0.0.0.0'
};
const production = {
    API_URL: ''
};
export const config = process.env.NODE_ENV === 'development' ? development : production;