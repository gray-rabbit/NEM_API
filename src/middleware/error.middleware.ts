import { NextFunction, Request, Response } from "express";
import HttpException from '../exceptions/HttpException';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || '알수없는 오류 발생';
    res.status(status)
        .send({
            status,
            message
        })
}

export default errorMiddleware;