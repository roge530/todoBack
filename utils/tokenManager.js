"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (uid) => {
    try {
        const expiresIn = 60 * 15;
        const token = jsonwebtoken_1.default.sign({ uid }, process.env.JWT_SECRET, {
            expiresIn,
        });
        return { token, expiresIn };
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al generar el token");
    }
};
exports.generateToken = generateToken;
