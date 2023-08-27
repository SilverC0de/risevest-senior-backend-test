"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_route_1 = __importDefault(require("./users.route"));
const posts_route_1 = __importDefault(require("./posts.route"));
const top3_route_1 = __importDefault(require("./top3.route"));
const routes = (0, express_1.Router)();
routes.use('/users', users_route_1.default);
routes.use('/posts', posts_route_1.default);
routes.use('/top3', top3_route_1.default);
exports.default = routes;
