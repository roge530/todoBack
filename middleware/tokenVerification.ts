import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const TokenVerification = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Non valid')
    jwt.verify(token, process.env.JWT_SECRET as string, (error, authData) => {
        if (error) {
            res.sendStatus(403);
        }
        else {
           next();
        }
    }) 
};
  
export default TokenVerification;
