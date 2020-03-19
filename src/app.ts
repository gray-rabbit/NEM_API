import express from 'express';
import { requestLoggerMiddleware } from './requestLoggerMiddleware';
import PostController from './posts/posts.controllers';



class ExpressApp {
    public app: express.Application;
    port: number = 3000;
    constructor(controllers: PostController[], port?: number, ) {
        this.app = express();
        if (port)
            this.port = port;

        this.initializeMiddleware();
        this.initializeControllers(controllers);
    }

    initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(requestLoggerMiddleware);
    }

    run() {
        this.app.listen(this.port, () => {
            console.log(`server is running ${this.port}`);
        })
    }

    private initializeControllers(controllers: PostController[]) {
        controllers.forEach((controller: PostController) => {
            this.app.use('/', controller.router);
        })
    }


}




export { ExpressApp }