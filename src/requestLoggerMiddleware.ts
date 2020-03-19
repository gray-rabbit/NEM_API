import express from "express";

const requestLoggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("---middleware---");
    // console.info(`${req.method} ${req.originalUrl}`);
    const start = new Date().getTime();

    res.on('finish',()=>{
        const elapsed = new Date().getTime()-start;
        console.log(`method:${req.method}\noriginURL:${req.originalUrl}\ncode:${res.statusCode}\nelapsed:${elapsed}ms`);
    })
    next();
}

export {requestLoggerMiddleware};
