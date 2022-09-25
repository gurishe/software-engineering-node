import {Request, Response} from "express";

/**
 * This is based on the Assignment 1 documentation:
 * // https://docs.google.com/document/d/1zWYPxurQGwcLcNfDbIq4oBGM-VOSV13LlZgaAbq1Fek/edit
 */
export default interface UserController {
    findAllUsers(req: Request, res: Response): void;
    findUserById(req: Request, res: Response): void;
    createUser(req: Request, res: Response): void;
    deleteUser(req: Request, res: Response): void;
    updateUser(req: Request, res: Response): void;
}
