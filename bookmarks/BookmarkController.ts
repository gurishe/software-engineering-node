/**
 * @file This contains an implementation of our Bookmark Controller Interface which is used
 * with Express to establish our API URIs and parse incoming HTTP messages to be passed off
 * to a data access object (DAO).
 */

import BookmarkControllerI from "./BookmarkControllerI";
import BookmarkDaoI from "./BookmarkDaoI";
import {Express, Request, Response} from "express";
import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * Our Bookmark controller implementation class for parsing HTTP requests and return JSON responses.
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkController: BookmarkControllerI | null = null;
    private static bookmarkDao: BookmarkDaoI;

    /**
     * Creates or returns an instance of the Bookmark Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Express} app The Express object that handles the HTTP parsing and responding
     * @param {BookmarkDaoI} bookmarkDao The DAO that handles communications with the remote database
     * @return {BookmarkControllerI} The initialized Bookmark Controller object
     */
    public static getInstance = (app: Express, bookmarkDao: BookmarkDaoI): BookmarkControllerI => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
        }
        BookmarkController.bookmarkDao = bookmarkDao;
        app.get('/api/users/:uid/bookmarks', BookmarkController.bookmarkController.findBookmarkedTuits);
        app.post('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.createBookmark);
        app.delete('/api/bookmarks/:bid', BookmarkController.bookmarkController.deleteBookmark);

        return BookmarkController.bookmarkController;
    }

    /**
     * Constructor to create our controller
     * @private private constructor to support the singleton pattern
     */
    private constructor() {}

    findBookmarkedTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .findBookmarkedTuits(req.params.uid)
            .then(tuits => res.json(tuits));

    createBookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .createBookmark(
                new User(
                    req.params.uid,
                    req.body.user.username,
                    req.body.user.password
                ),
                new Tuit(
                    req.params.tid,
                    req.body.tuit.tuit,
                    req.body.tuit.postedOn
                )
            )
            .then(bookmark => res.json(bookmark));

    deleteBookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .deleteBookmark(req.params.bid)
            .then(result => res.json(result));
}