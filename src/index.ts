import { ExpressApp } from "./app";
import PostController from "./posts/posts.controllers";

const app = new ExpressApp([
    new PostController()
]);
app.run();
