"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const authenticator_1 = __importDefault(require("../middlewares/authenticator"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const router = (0, express_1.Router)();
router.get('/', users_controller_1.default.listUsers);
router.post('/', [
    (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail({
        all_lowercase: true,
    }),
    (0, express_validator_1.check)('password')
        .isStrongPassword({
        minLength: 5,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0,
    })
        .withMessage('Password must have at least 5 characters')
        .trim(),
    (0, express_validator_1.check)('name')
        .isLength({ min: 2 })
        .withMessage('Please enter a valid name')
        .escape()
        .trim()
], validator_1.default, users_controller_1.default.addUser);
router.get('/:id/posts', [
    (0, express_validator_1.check)('id')
        .isNumeric()
        .withMessage('User id must be numeric')
        .trim()
], validator_1.default, authenticator_1.default, users_controller_1.default.allUserPosts);
router.post('/:id/posts', [
    (0, express_validator_1.check)('id')
        .isNumeric()
        .withMessage('User id must be numeric')
        .trim(),
    (0, express_validator_1.check)('title')
        .isLength({ min: 2 })
        .withMessage('Title must be more than 2 characters')
        .escape()
        .trim(),
    (0, express_validator_1.check)('content')
        .isLength({ min: 2 })
        .withMessage('Post content must be more than 2 characters')
        .escape()
        .trim()
], validator_1.default, authenticator_1.default, users_controller_1.default.addUserPost);
router.post('/login', [
    (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail({
        all_lowercase: true,
    }),
    (0, express_validator_1.check)('password')
        .isStrongPassword({
        minLength: 5,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0,
    })
        .withMessage('Password must have at least 5 characters')
        .trim()
], validator_1.default, users_controller_1.default.loginUser);
exports.default = router;
