/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import TuitDao from "./daos/TuitDao";
import UserDao from "./daos/UserDao";
import mongoose from "mongoose";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/tuiter');

const tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao);

const userDao = new UserDao();
const userController = new UserController(app, userDao);

const welcome = (req: Request, res: Response) => res.send('Welcome to Foundations of Software Engineering!');
app.get('/', welcome);


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
