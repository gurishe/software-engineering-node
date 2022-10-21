import BookmarkControllerI from "./BookmarkControllerI";
import BookmarkDaoI from "./BookmarkDaoI";
import {Express, Request, Response} from "express";
import User from "../users/User";
import Tuit from "../tuits/Tuit";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkController: BookmarkControllerI | null = null;
    private static bookmarkDao: BookmarkDaoI;

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