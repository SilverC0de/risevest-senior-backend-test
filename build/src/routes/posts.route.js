"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const posts_controller_1 = __importDefault(require("../controllers/posts.controller"));
const authenticator_1 = __importDefault(require("../middlewares/authenticator"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const router = (0, express_1.Router)();
router.post('/:post_id/comments', [
    (0, express_validator_1.check)('post_id')
        .isNumeric()
        .withMessage('User id must be numeric')
        .trim(),
    (0, express_validator_1.check)('comment')
        .isLength({ min: 1 })
        .withMessage('Comment must have at least 1 character')
        .escape()
        .trim(),
], validator_1.default, authenticator_1.default, posts_controller_1.default.postUserComment);
exports.default = router;
