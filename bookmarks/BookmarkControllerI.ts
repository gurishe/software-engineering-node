import {Request, Response} from "express";

export default interface BookmarkControllerI {
    createBookmark(req: Request, res: Response): void;
    deleteBookmark(req: Request, res: Response): void;
    findBookmarkedTuits(req: Request, res: Response): void;
}