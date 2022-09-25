import {Request, Response} from "express";

/**
 * This is based on the Assignment 1 documentation:
 * // https://docs.google.com/document/d/1zWYPxurQGwcLcNfDbIq4oBGM-VOSV13LlZgaAbq1Fek/edit
 */
export default interface TuitController {
    findAllTuits(req: Request, res: Response): void;
    findTuitById(req: Request, res: Response): void;
    findTuitsByUser(req: Request, res: Response): void;
    createTuit(req: Request, res: Response): void;
    updateTuit(req: Request, res: Response): void;
    deleteTuit(req: Request, res: Response): void;
}
