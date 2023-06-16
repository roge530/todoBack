import {Router, Request, Response} from 'express';
import UserModel, { IUser } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();
interface Activity {
    id: string;
    name: string;
    status: string;
}
router.post('/newActivity/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const activity  = req.body;

    try {
        const user: IUser | null = await UserModel.findById(id);

        if (!user) return res.status(404).json({error: 'User does not exists'});
        const activityId = uuidv4();
        const activityWithId = { id: activityId, ...activity };
        user.activities.push(activityWithId);
        await user.save();

        return res.json({id: activityId});
    } catch (error: any) {
        return res.status(500).json({error: 'Server error'});
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user: IUser | null = await UserModel.findById(id);

        if (!user) return res.status(404).json({error: 'User does not exists'});
        const activities = user.activities;
        return res.json({ activities });
    } catch (error: any) {
        return res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/editActivity', async (req: Request, res: Response) => {
    const { idUser, idActivity, status, name } = req.body;

    try {
        const user: IUser | null = await UserModel.findById(idUser);

        if (!user) return res.status(404).json({ error: 'User does not exist' });
        
        let activityIndex = -1;
        const activities: Activity[] = user.activities as Activity[];
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

        await user.save();

        return res.json({ message: 'Activity updated' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
})

export default router;