/**
 * @file Implements an Express Node HTTP server. This establishes our controllers and data
 * access objects as well as sets up the connection to our remote database.
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
import BookmarkController from "./bookmarks/BookmarkController";
import BookmarkDao from "./bookmarks/BookmarkDao";
import MessageController from "./messages/MessageController";
import MessageDao from "./messages/MessageDao";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const USER = process.env.DB_USER;
const PWD = process.env.DB_PWD;
const DB_NAME = process.env.DB_NAME || 'tuiter';
mongoose.connect(`mongodb+srv://${USER}:${PWD}@cs5500.rmrbkxw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);

const userController = UserController.getInstance(app, UserDao.getInstance());
const tuitController = TuitController.getInstance(app, TuitDao.getInstance());
const likeController = LikeController.getInstance(app, LikeDao.getInstance());
const followController = FollowController.getInstance(app, FollowDao.getInstance());
const bookmarkController = BookmarkController.getInstance(app, BookmarkDao.getInstance());
const messageController = MessageController.getInstance(app, MessageDao.getInstance());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to CS5500 Tuiter API')
);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
