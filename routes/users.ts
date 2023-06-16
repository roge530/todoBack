import {Router, Request, Response} from 'express';
import UserModel from '../models/user'
import { generateToken } from '../utils/tokenManager';
import bcrypt from 'bcryptjs';

const router: Router = Router();

router.post('/signUp', async (req: Request, res: Response) => {
    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);

        newUser.password = hashedPassword;
        const createdUser = await newUser.save()
        res.status(201).json({message: 'User created'})
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
})

router.post('/logIn', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { token, expiresIn } = generateToken(user.email);
        const name = user.name;
        const id = user.id;
        res.status(200).json({ token, expiresIn, name, id });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
})

export default router