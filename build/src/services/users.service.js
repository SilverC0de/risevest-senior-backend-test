"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.listUser = exports.createUser = void 0;
const database_1 = __importDefault(require("../config/database"));
const createUser = (email, hashedPassword, name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)', [email, hashedPassword, name]);
    return result;
});
exports.createUser = createUser;
const listUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query(`SELECT id, email, password, name, created_at FROM users LIMIT 100`, null);
    return result;
});
exports.listUser = listUser;
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query(`SELECT id, email, password, name, created_at FROM users WHERE email = $1 LIMIT 1`, [email]);
    return result;
});
exports.getUser = getUser;
