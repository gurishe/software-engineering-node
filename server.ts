/**
 * @file Implements an Express Node HTTP server.
 */

import LikesController from "./likes/LikesController";
import TuitDao from "./tuits/TuitDao";
import TuitController from "./tuits/TuitController";
import UserDao from "./users/UserDao";
import UserController from "./users/UserController";
import express, {Request, Response} from 'express';
import * as mongoose from "mongoose";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://cs5500-eg:Zhbds2123@cs5500.rmrbkxw.mongodb.net/tuiter?retryWrites=true&w=majority');

const userDao = new UserDao();
const userController = new UserController(app, userDao);

const tuitDao = TuitDao.getInstance();
const tuitController = TuitController.getInstance(app, tuitDao);

const welcome = (req: Request, res: Response) => res.send('Welcome to Foundations of Software Engineering!');
app.get('/', welcome);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
