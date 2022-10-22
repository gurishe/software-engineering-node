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
 * @property {LikeController} likeController The internal controller instance
 * @property {LikeDao} likeDao The internal DAO instance
 */
export default class LikeController implements LikeControllerI {
    private static likesController: LikeControllerI | null = null;
    private static likeDao: LikeDaoI;

    /**
     * Creates or returns an instance of the Like Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Express} app The Express object that handles the HTTP parsing and responding
     * @param {LikeDao} likeDao The DAO that handles communications with the remote database
     * @return {LikeController} The initialized Like Controller object
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
     * @private
     */
    private constructor() {}

    /**
     * Parses an HTTP request and adds a JSON formatted array of Tuits liked by a User to the HTTP
     * response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findTuitsUserLiked = (req: Request, res: Response) =>
        LikeController.likeDao
            .findTuitsUserLiked(req.params.uid)
            .then(likes => res.json(likes));

    /**
     * Parses an HTTP request and adds a JSON formatted array of Users who liked a specific Tuit to
     * the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao
            .findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Parses an HTTP request and adds a JSON status to the HTTP response indicating the number of
     * likes on a specific Tuit.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findTuitLikesCount = (req: Request, res: Response) =>
        LikeController.likeDao
            .findTuitLikesCount(req.params.tid)
            .then(likes => res.json({likes}));

    /**
     * Parses an HTTP request and adds a new JSON formatted Like object to the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao
            .userLikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     * Parses an HTTP request and adds a JSON version of the result of deleting a Follow object in
     * the HTTP response. This deletion represents the act of unliking a Tuit.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao
            .userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
}