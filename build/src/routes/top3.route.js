"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const top3_controller_1 = __importDefault(require("../controllers/top3.controller"));
const router = (0, express_1.Router)();
router.get('/', top3_controller_1.default.top3UsersByPosr);
exports.default = router;
