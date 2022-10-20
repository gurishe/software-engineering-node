/**
 * @file Implements an Express Node HTTP server.
 */

import LikeController from "./likes/LikeController";
import TuitDao from "./tuits/TuitDao";
import TuitController from "./tuits/TuitController";
import UserDao from "./users/UserDao";
import UserController from "./users/UserController";
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import LikeDao from "./likes/LikeDao";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://cs5500-eg:Zhbds2123@cs5500.rmrbkxw.mongodb.net/tuiter?retryWrites=true&w=majority');

const userDao = new UserDao();
const userController = new UserController(app, userDao);
const tuitController = TuitController.getInstance(app, TuitDao.getInstance());
const likeController = LikeController.getInstance(app, LikeDao.getInstance())

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to CS5500 Tuiter API')
);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
