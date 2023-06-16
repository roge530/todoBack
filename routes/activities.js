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
const user_1 = __importDefault(require("../models/user"));
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.post('/newActivity/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const activity = req.body;
    try {
        const user = yield user_1.default.findById(id);
        if (!user)
            return res.status(404).json({ error: 'User does not exists' });
        const activityId = (0, uuid_1.v4)();
        console.log(req.body);
        const activityWithId = Object.assign({ id: activityId }, activity);
        user.activities.push(activityWithId);
        yield user.save();
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
