/**
 * @file The interface that all of our controllers dealing with Users must implement
 */

import {Request, Response} from "express";

/**
 * The interface for our Message controllers
 * @interface MessageControllerI
 */
export default interface MessageControllerI {
    createMessage(req: Request, res: Response): void;
    findSentMessages(req: Request, res: Response): void;
    findReceivedMessages(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
}