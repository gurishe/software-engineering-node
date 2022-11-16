/**
 * @file This contains an implementation of our User Controller Interface which is used
 * with Express to establish our API URIs and parse incoming HTTP messages to be passed off
 * to a data access object (DAO).
 */

import {Request, Response, Express} from "express";
import UserControllerI from "./UserControllerI";
import UserDaoI from "./UserDaoI";
import User from "./User";

/**
 * Our User controller implementation class for parsing HTTP requests and return JSON responses.
 * @property {UserController} userController The internal controller instance
 * @property {UserDao} userDao The internal DAO instance
 * @class UserController
 * @implements {UserControllerI}
 */
export default class UserController implements UserControllerI {
    private static userController: UserController | null = null;
    private static userDao: UserDaoI;

    /**
     * Creates or returns an instance of the User Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Express} app The Express object that handles the HTTP parsing and responding
     * @param {UserDao} userDao The DAO that handles communications with the remote database
     * @return {UserController} The initialized User Controller object
     */
    public static getInstance = (app: Express, userDao: UserDaoI): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
        }

        UserController.userDao = userDao;
        app.get('/api/users', UserController.userController.findAllUsers);
        app.get('/api/users/:userid', UserController.userController.findUserById);
        app.get('/api/users/username/:username', UserController.userController.findUserByUsername);
        app.post('/api/users', UserController.userController.createUser);
        app.delete('/api/users/:userid', UserController.userController.deleteUser);
        app.put('/api/users/:userid', UserController.userController.updateUser);
        app.delete('/api/users/username/:username', UserController.userController.deleteUsersByUsername);

        return UserController.userController;
    }

    /**
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * Parses an HTTP request and adds a JSON formatted array of all Users in the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao
            .findAllUsers()
            .then(users => res.json(users));

    /**
     * Parses an HTTP request and adds a JSON User object representing the specified User in the
     * HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao
            .findUserById(req.params.userid)
            .then(user => res.json(user));

    /**
     * Parses an HTTP request and returns the matching User given their username or null if a match
     * is not found.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findUserByUsername = (req: Request, res: Response) =>
        UserController.userDao
            .findUserByUsername(req.params.username)
            .then(user => res.json(user));

    /**
     * Parses an HTTP request and adds a JSON formatted User object representing the new User
     * in the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao
            .createUser(req.body)
            .then(user => res.json(user));

    /**
     * Parses an HTTP request and adds a JSON formatted status of the delete request in the HTTP
     * response. This deletes a user by a given id.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao
            .deleteUser(req.params.userid)
            .then(status => res.json(status));

    /**
     * Parses an HTTP request and adds a JSON formatted status of the delete request in the HTTP
     * response. This deletes any users with the matching username.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    deleteUsersByUsername = (req: Request, res: Response) =>
        UserController.userDao
            .deleteUsersByUsername(req.params.username)
            .then(status => res.json(status));

    /**
     * Parses an HTTP request and adds a JSON formatted status of the update request in the HTTP
     * response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    updateUser = (req: Request, res: Response) => {
        const user = new User(req.params.userid, req.body.username, req.body.password)
        user.setEmail = req.body.email ?? '';
        UserController.userDao
            .updateUser(req.params.userid, user)
            .then(status => res.json(status));
    }
}
