/**
 * @file This is the authentication controller for keeping track of user session. This is important
 * for things like logging in, logging out, and displaying user info.
 */

import {Express, Response, Request} from "express";
import User from "../users/User";
import UserDaoI from "../users/UserDaoI";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Adds session management and authentication methods to the given Express app.
 * @param {Express} app The Express application that our server creates
 * @param {UserDaoI} userDao The User DAO created by our application
 * @constructor
 */
const AuthenticationController = (app: Express, userDao: UserDaoI) => {

    /**
     * The sign-up method used to register a new User
     * @param {Request} req The Request object our Express app receives
     * @param {Response} res The Response object for our Express app to return
     */
    const signup = async (req: Request, res: Response) => {
        // if a user with this username already exists, return error
        const existingUser = await userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }

        // set up our user from the request info
        const newUser = new User(req.body.id ?? '', req.body.username, req.body.password);
        newUser.setEmail = req.body.email ?? '';
        const password = newUser.pass;
        // encrypt the password
        newUser.setPass = await bcrypt.hash(password, saltRounds);
        // add the new user and return it with the password hidden
        const insertedUser = await userDao.createUser(newUser);
        insertedUser.setPass = '';
        req.session['profile'] = insertedUser;
        res.json(insertedUser);
    }
    app.post("/api/auth/signup", signup);
}

export default AuthenticationController;