"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const tokenVerification_1 = __importDefault(require("../middleware/tokenVerification"));
const activities_1 = __importDefault(require("./activities"));
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    res.json({ 'info': 'Welcome to TODO API!' });
});
router.get('/v', tokenVerification_1.default, (req, res) => {
    res.json({ 'message': 'Verified' });
});
router.use('/users', users_1.default);
router.use('/activity', activities_1.default);
