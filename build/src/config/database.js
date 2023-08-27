"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const index_1 = __importDefault(require("./index"));
const client = new pg_1.Client({
    connectionString: index_1.default.DB.POSTGRES
});
client.connect();
const database = {
    query: (text, params) => client.query(text, params)
};
exports.default = database;
