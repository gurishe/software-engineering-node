/**
 * @file This is the authentication controller for keeping track of user session. This is important
 * for things like logging in, logging out, and displaying user info.
 */

import {Express, Response, Request} from "express";
import User from "../users/User";
import UserDaoI from "../users/UserDaoI";
import AuthenticationControllerI from "./AuthControllerI";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Adds session management and authentication methods to the given Express app.
 * @param {Express} app The Express application that our server creates
 * @param {UserDaoI} userDao The User DAO created by our application
 * @class AuthenticationController
 */
export default class AuthenticationController implements AuthenticationControllerI {
    private static authController: AuthenticationController | null = null;
    private static userDao: UserDaoI;

    public static getInstance = (app: Express, userDao: UserDaoI): AuthenticationController => {
        if (AuthenticationController.authController === null) {
            AuthenticationController.authController = new AuthenticationController();
        }

        AuthenticationController.userDao = userDao;
        app.post("/api/auth/profile", AuthenticationController.authController.profile);
        app.post("/api/auth/logout", AuthenticationController.authController.logout);
        app.post("/api/auth/signup", AuthenticationController.authController.signup);
        app.post("/api/auth/login", AuthenticationController.authController.login);

        return AuthenticationController.authController;
    }

    /**
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * The sign-up method used to register a new User
     * @param {Request} req The Request object our Express app receives
     * @param {Response} res The Response object for our Express app to return
     */
    signup = async (req: Request, res: Response) => {
        // if a user with this username already exists, return error
        const existingUser = await AuthenticationController.userDao
            .findUserByUsername(req.body.username);
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
        const insertedUser = await AuthenticationController.userDao
            .createUser(newUser);
        insertedUser.setPass = '';
        req.session['profile'] = insertedUser;
        res.json(insertedUser);
    }

    /**
     * Adds the currently logged-in User's profile/session information for the front-end
     * @param {Request} req The Request object our Express app receives
     * @param {Response} res The Response object for our Express app to return
     */
    profile = (req: Request, res: Response) => {
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "";
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * Logs the current user out by removing their information from the server's session object
     * @param {Request} req The Request object our Express app receives
     * @param {Response} res The Response object for our Express app to return
     */
    logout = (req: Request, res: Response) => {
        req.session.destroy((err) => res.redirect('/'));
        res.sendStatus(200);
    }

    /**
     * Logs the user in based on their username and password or returns an error response if invalid
     * @param {Request} req The Request object our Express app receives
     * @param {Response} res The Response object for our Express app to return
     */
    login = async (req: Request, res: Response) => {
        // check the username exists
        const username = req.body.username;
        const existingUser = await AuthenticationController.userDao
            .findUserByUsername(username);

        if (!existingUser) {
            res.sendStatus(403);
            return;
        }

        // check the password matches and return appropriately
        const password = req.body.password;
        const match = await bcrypt.compare(password, existingUser.pass);

        if (match) {
            existingUser.setPass = '*****';
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    };
}