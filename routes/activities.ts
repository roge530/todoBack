import {Router, Request, Response} from 'express';
import UserModel, { IUser } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();

router.post('/newActivity/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const activity  = req.body;

    try {
        const user: IUser | null = await UserModel.findById(id);

        if (!user) return res.status(404).json({error: 'User does not exists'});
        const activityId = uuidv4();
        console.log(req.body)
        const activityWithId = { id: activityId, ...activity };
        user.activities.push(activityWithId);
        await user.save();

        return res.json(user);
    } catch (error: any) {
        return res.status(500).json({error: 'Server error'});
    }
});

export default router;