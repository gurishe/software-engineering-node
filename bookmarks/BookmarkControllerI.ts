/**
 * @file The interface that all of our controllers dealing with Bookmarks must implement
 */

import {Request, Response} from "express";

/**
 * The interface for our Bookmark controllers
 * @interface BookmarkControllerI
 */
export default interface BookmarkControllerI {
    createBookmark(req: Request, res: Response): void;
    deleteBookmark(req: Request, res: Response): void;
    findBookmarkedTuits(req: Request, res: Response): void;
}