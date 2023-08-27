"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    SERVER: {
        PORT: process.env.PORT,
        VERSION: process.env.VERSION,
        KEY: process.env.KEY
    },
    DB: {
        POSTGRES: process.env.POSTGRES
    },
    KEY: {
        MAILGUN: process.env.MAILGUN_API_KEY,
    },
};
exports.default = config;
