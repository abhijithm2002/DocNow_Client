


const CONSTANTS_COMMON = {
    API_BASE_URL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/' // Use localhost in development
        : 'https://api.abhijithm.online/' // Use production API URL
};

export default CONSTANTS_COMMON;
