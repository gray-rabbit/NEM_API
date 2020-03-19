import express, { response } from 'express';
import Post from './post.interface';
import { postModel } from './post.mddel';
import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';

class PostController implements Controller {

    public path = '/posts';
    public router = express.Router();
    private post = postModel;

    private posts: Post[] = [];
    constructor() {
        this.initializeRouters();
    }
    public initializeRouters() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.put(`${this.path}/:id`, this.modifyPost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
        this.router.post(this.path, this.createAPost);
    }

    getAllPosts = (req: express.Request, res: express.Response) => {
        this.post.find().then(posts => {
            res.json(posts);
        })
    }

    getPostById = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        this.post.findById(id)
            .then(post => {
                if (post)
                    res.json(post);
                else
                    next(new PostNotFoundException(id));
            })
    }

    modifyPost = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        const postData: Post = req.body;
        this.post.findByIdAndUpdate(id, postData, { new: true })
            .then(post => {
                if (post) {
                    res.json(post);
                }
                else {
                    next(new PostNotFoundException(id));
                }
            })
    }
    deletePost = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        this.post.findByIdAndDelete(id)
            .then(successResponse => {
                if (successResponse) {
                    res.send(200);
                } else {
                    next(new PostNotFoundException(id));
                }
            })
    }

    createAPost = (req: express.Request, res: express.Response) => {
        const postData: Post = req.body;
        const createPost = new this.post(postData);
        createPost.save()
            .then(post => {
                res.json(post);
            })
    }
}

export default PostController;