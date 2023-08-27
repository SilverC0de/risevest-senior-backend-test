"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        return res.status(422).json({
            message: errorsArray[0].msg,
        });
    }
    next();
};
exports.default = validateRequest;
