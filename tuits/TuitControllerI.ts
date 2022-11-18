/**
 * @file The interface that all of our controllers dealing with Tuits must implement
 */

import {Request, Response} from "express";

/**
 * The interface for our Tuit controllers
 * @interface TuitControllerI
 */
export default interface TuitControllerI {
    findAllTuits(req: Request, res: Response): void;
    findTuitById(req: Request, res: Response): void;
    findTuitsByAuthor(req: Request, res: Response): void;
    createTuit(req: Request, res: Response): void;
    deleteTuit(req: Request, res: Response): void;
    updateTuit(req: Request, res: Response): void;
}