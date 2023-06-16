"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenVerification = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        throw new Error('Non valid');
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, authData) => {
        if (error) {
            res.sendStatus(403);
        }
        else {
            next();
        }
    });
};
exports.default = TokenVerification;
