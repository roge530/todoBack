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
        const activityWithId = Object.assign({ id: activityId }, activity);
        user.activities.push(activityWithId);
        yield user.save();
        return res.json({ id: activityId });
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findById(id);
        if (!user)
            return res.status(404).json({ error: 'User does not exists' });
        const activities = user.activities;
        return res.json({ activities });
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}));
router.patch('/editActivity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idActivity, status, name } = req.body;
    try {
        const user = yield user_1.default.findById(idUser);
        if (!user)
            return res.status(404).json({ error: 'User does not exist' });
        let activityIndex = -1;
        const activities = user.activities;
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].id === idActivity) {
                activityIndex = i;
                break;
            }
        }
        if (activityIndex === -1) {
            return res.status(404).json({ error: 'Activity does not exist' });
        }
        if (status !== null) {
            activities[activityIndex].status = status;
            user.activities = activities;
            user.markModified('activities');
        }
        if (name !== null) {
            activities[activityIndex].name = name;
            user.activities = activities;
            user.markModified('activities');
        }
        yield user.save();
        return res.json({ message: 'Activity updated' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}));
router.delete('/removeActivity/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const activityID = req.body.activityID;
    try {
        const user = yield user_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }
        const activities = user.activities;
        const updatedActivities = activities.filter((activity) => activity.id !== activityID);
        user.activities = updatedActivities;
        user.markModified('activities');
        yield user.save();
        return res.json({ message: 'Activity removed' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
