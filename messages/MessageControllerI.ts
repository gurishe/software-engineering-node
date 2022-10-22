import {Request, Response} from "express";

export default interface MessageControllerI {
    createMessage(req: Request, res: Response): void;
    findSentMessages(req: Request, res: Response): void;
    findReceivedMessages(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
}