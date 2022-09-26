import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import TuitDao from "./daos/TuitDao";
import UserDao from "./daos/UserDao";
import * as mongoose from "mongoose";

//const cors = require('cors');
const express = require('express');
const app = express();
//app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/cs5500')

/*
const tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao);
*/

const userDao = new UserDao();
const userController = new UserController(app, userDao);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
