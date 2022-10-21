import {Request, Response, Express} from "express";
import UserControllerI from "./UserControllerI";
import UserDaoI from "./UserDaoI";

export default class UserController implements UserControllerI {
    private static userController: UserControllerI | null = null;
    private static userDao: UserDaoI;

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
