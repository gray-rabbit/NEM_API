import express, { response } from 'express';
import Post from './post.interface';

class PostController {

    public path = '/posts';
    public router = express.Router();

    private posts: Post[] = [];
    constructor() {
        this.initializeRouters();
    }
    public initializeRouters() {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createAPost);
    }

    getAllPosts = (req: express.Request, res: express.Response) => {
        res.json(this.posts);
    }

    createAPost = (req: express.Request, res: express.Response) => {
        const post: Post = req.body;
        this.posts.push(post);
        res.json(post);
    }
}

export default PostController;