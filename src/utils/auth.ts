import { Request, Response, NextFunction } from 'express'

export default function isAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.headers.admin === 'true') {
        next()
    } else {
        res.status(401).json({ error: 'No autorizado' })
    }
}
