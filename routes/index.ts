import {Router} from 'express';
import users from './users';
import TokenVerification from '../middleware/tokenVerification';
const router = Router();

router.get('/', (req, res) => {
    res.json({'info': 'Welcome to TODO API!'})
});

router.get('/v', TokenVerification, (req, res) => {
    res.json({'message': 'Verified'})
})
router.use('/users', users);
export {router}