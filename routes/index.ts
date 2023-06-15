import {Router} from 'express';
import users from './users';
const router = Router();

router.get('/', (req, res) => {
    res.json({'info': 'Welcome to TODO API!'})
});
router.use('/users', users);
export {router}