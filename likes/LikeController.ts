/**
 * @file This contains an implementation of our Like Controller Interface which is used
 * with Express to establish our API URIs and parse incoming HTTP messages to be passed off
 * to a data access object (DAO).
 */

import {Express, Request, Response} from "express";
import LikeDaoI from "./LikeDaoI";
import LikeControllerI from "./LikeControllerI";

/**
 * Our Like controller implementation class for parsing HTTP requests and return JSON responses.
 */
export default class LikeController implements LikeControllerI {
    private static likesController: LikeControllerI | null = null;
    private static likeDao: LikeDaoI;

    /**
     * Creates or returns an instance of the Like Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Object} app The Express object that handles the HTTP parsing and responding
     * @param {Object} likeDao The DAO that handles communications with the remote database
     * @return {Object} The initialized Like Controller object
     */
    public static getInstance = (app: Express, likeDao: LikeDaoI): LikeControllerI => {
        if (LikeController.likesController === null) {
            LikeController.likesController = new LikeController();
        }
        LikeController.likeDao = likeDao;
        app.get("/api/users/:uid/likes", LikeController.likesController.findTuitsUserLiked);
        app.get("/api/tuits/:tid/likes", LikeController.likesController.findUsersThatLikedTuit);
        app.get("/api/tuits/:tid/likes/count", LikeController.likesController.findTuitLikesCount);
        app.post("/api/users/:uid/likes/:tid", LikeController.likesController.userLikesTuit);
        app.delete("/api/users/:uid/likes/:tid", LikeController.likesController.userUnlikesTuit);

        return LikeController.likesController;
    }

    /**
     * Constructor to create our controller
     * @private private constructor to support the singleton pattern
     */
    private constructor() {}

    findTuitsUserLiked = (req: Request, res: Response) =>
        LikeController.likeDao
            .findTuitsUserLiked(req.params.uid)
            .then(likes => res.json(likes));

    findUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao
            .findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    findTuitLikesCount = (req: Request, res: Response) =>
        LikeController.likeDao
            .findTuitLikesCount(req.params.tid)
            .then(likes => res.json({likes}));

    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao
            .userLikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao
            .userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
}