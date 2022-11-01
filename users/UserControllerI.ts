/**
 * @file The interface that all of our controllers dealing with Users must implement
 */

import {Request, Response} from "express";

/**
 * The interface for our User controllers
 * @interface UserControllerI
 */
export default interface UserControllerI {
    findAllUsers(req: Request, res: Response): void;
    findUserById(req: Request, res: Response): void;
    createUser(req: Request, res: Response): void;
    deleteUser(req: Request, res: Response): void;
    updateUser(req: Request, res: Response): void;
    deleteUsersByUsername(req: Request, res: Response): void;
}
