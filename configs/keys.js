module.exports = {
    app: {
        name: "Virtual Learning System", // App name
    },
    port: process.env.PORT || 3000, // Server port
    database: {
        url: process.env.MONGO_DB_URL, // MongoDB connection URL
    },
    jwt: {
        secret: process.env.JWT_SECRET, // JWT secret key
        tokenLife: "7d", // JWT token life
    },
};
