import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { hasPermission } from '../../infrastructure/utils/hasPermission';

export const authorizeRoleMiddleware = (resource: string, permission: string) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        const userId = req.user!.userId || "";
        console.log(userId)
        const isAuthorized = await hasPermission(userId, resource, permission);
        console.log(isAuthorized)
        if (!isAuthorized) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    };
};
