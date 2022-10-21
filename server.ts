/**
 * @file Implements an Express Node HTTP server.
 */

import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import LikeController from "./likes/LikeController";
import LikeDao from "./likes/LikeDao";
import TuitDao from "./tuits/TuitDao";
import TuitController from "./tuits/TuitController";
import UserDao from "./users/UserDao";
import UserController from "./users/UserController";
import FollowController from "./follows/FollowController";
import FollowDao from "./follows/FollowDao";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://cs5500-eg:Zhbds2123@cs5500.rmrbkxw.mongodb.net/tuiter?retryWrites=true&w=majority');

const userController = UserController.getInstance(app, UserDao.getInstance());
const tuitController = TuitController.getInstance(app, TuitDao.getInstance());
const likeController = LikeController.getInstance(app, LikeDao.getInstance());
const followController = FollowController.getInstance(app, FollowDao.getInstance());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to CS5500 Tuiter API')
);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
