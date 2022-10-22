/**
 * @file This contains an implementation of our User Controller Interface which is used
 * with Express to establish our API URIs and parse incoming HTTP messages to be passed off
 * to a data access object (DAO).
 */

import {Request, Response, Express} from "express";
import UserControllerI from "./UserControllerI";
import UserDaoI from "./UserDaoI";

/**
 * Our User controller implementation class for parsing HTTP requests and return JSON responses.
 */
export default class UserController implements UserControllerI {
    private static userController: UserControllerI | null = null;
    private static userDao: UserDaoI;

    /**
     * Creates or returns an instance of the User Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Object} app The Express object that handles the HTTP parsing and responding
     * @param {Object} userDao The DAO that handles communications with the remote database
     * @return {Object} The initialized User Controller object
     */
    public static getInstance = (app: Express, userDao: UserDaoI): UserControllerI => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
        }

        UserController.userDao = userDao;
        app.get('/api/users', UserController.userController.findAllUsers);
        app.get('/api/users/:userid', UserController.userController.findUserById);
        app.post('/api/users', UserController.userController.createUser);
        app.delete('/api/users/:userid', UserController.userController.deleteUser);
        app.put('/api/users/:userid', UserController.userController.updateUser);

        return UserController.userController;
    }

    /**
     * Constructor to create our controller
     * @private private constructor to support the singleton pattern
     */
    private constructor() {}

    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));

    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
}
