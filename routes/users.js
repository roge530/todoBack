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
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_1 = __importDefault(require("../models/user"));
const tokenManager_1 = require("../utils/tokenManager");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
router.post('/signUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_1.default({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(newUser.password, salt);
        newUser.password = hashedPassword;
        const createdUser = yield newUser.save();
        res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post('/logIn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const { token, expiresIn } = (0, tokenManager_1.generateToken)(user.email);
        const name = user.name;
        res.status(200).json({ token, expiresIn, name });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
