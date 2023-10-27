const apiConfig = {
    baseUrl: process.env.API_URL ?? 'http://localhost:8080',
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
};


module.exports = apiConfig;