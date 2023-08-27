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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const authenticator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: 'Authorization is required',
            });
        }
        const token = authHeader.split(' ')[1];
        const verifiedUser = jsonwebtoken_1.default.verify(token, config_1.default.SERVER.KEY, {
            algorithms: ['HS256'],
        });
        if (verifiedUser) {
            req.user = verifiedUser;
            next();
        }
        else {
            return res.status(401).json({
                status: false,
                message: 'Invalid authentication token',
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            status: false,
            message: 'Invalid authentication token',
        });
    }
});
exports.default = authenticator;
