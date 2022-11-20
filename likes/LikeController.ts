/**
 * @file This contains an implementation of our Like Controller Interface which is used
 * with Express to establish our API URIs and parse incoming HTTP messages to be passed off
 * to a data access object (DAO).
 */

import {Express, Request, Response} from "express";
import LikeDaoI from "./LikeDaoI";
import LikeControllerI from "./LikeControllerI";
import TuitDaoI from "../tuits/TuitDaoI";

/**
 * Our Like controller implementation class for parsing HTTP requests and return JSON responses.
 * @property {LikeController} likeController The internal controller instance
 * @property {LikeDao} likeDao The internal DAO instance
 * @class LikeController
 * @implements {LikeControllerI}
 */
export default class LikeController implements LikeControllerI {
    private static likesController: LikeController | null = null;
    private static likeDao: LikeDaoI;
    private static tuitDao: TuitDaoI;

    /**
     * Creates or returns an instance of the Like Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Express} app The Express object that handles the HTTP parsing and responding
     * @param {LikeDao} likeDao The DAO that handles communications with the remote database for Likes
     * @param {TuitDao} tuitDao The DAO that handles communications with the remote database for Tuits
     * @return {LikeController} The initialized Like Controller object
     */
    public static getInstance = (app: Express, likeDao: LikeDaoI, tuitDao: TuitDaoI): LikeController => {
        if (LikeController.likesController === null) {
            LikeController.likesController = new LikeController();
        }
        LikeController.likeDao = likeDao;
        LikeController.tuitDao = tuitDao;

        app.get("/api/users/:uid/likes", LikeController.likesController.findTuitsUserLiked);
        app.get("/api/users/:uid/dislikes", LikeController.likesController.findTuitsUserDisliked);
        app.get("/api/tuits/:tid/likes", LikeController.likesController.findUsersThatLikedTuit);
        app.get("/api/tuits/:tid/likes/count", LikeController.likesController.findTuitLikesCount);
        app.get("/api/users/:uid/likes/:tid", LikeController.likesController.findUserLikesTuit);
        app.post("/api/users/:uid/likes/:tid", LikeController.likesController.userLikesTuit);
        app.delete("/api/users/:uid/likes/:tid", LikeController.likesController.userUnlikesTuit);
        app.put("/api/users/:uid/likes/:tid", LikeController.likesController.userTogglesTuitLikes);
        app.put("/api/users/:uid/dislikes/:tid", LikeController.likesController.userTogglesTuitDislikes);

        return LikeController.likesController;
    }

    /**
     * Private constructor to support the singleton pattern
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
    findTuitsUserLiked = (req: Request, res: Response) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile.id : uid;

        LikeController.likeDao
            .findTuitsUserLiked(userId)
            .then(likes => res.json(likes));
    }

    /**
     * Parses an HTTP request and adds a JSON formatted array of Tuits disliked by a User to the HTTP
     * response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findTuitsUserDisliked = (req: Request, res: Response) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile.id : uid;

        LikeController.likeDao
            .findTuitsUserDisliked(userId)
            .then(dislikes => res.json(dislikes));
    }

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
     * Parses an HTTP request and adds the matching JSON formatted Like object to the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findUserLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao
            .findUserLikesTuit(req.params.uid, req.params.tid)
            .then(like => res.json(like));

    /**
     * Parses an HTTP request and adds a new JSON formatted Like object to the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao
            .userLikesTuit(req.params.uid, req.params.tid, false)
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

    /**
     * Parses an HTTP request, updates the amount of likes associated with a tuit, and then sets
     * the HTTP response appropriately if it was successful or not
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    userTogglesTuitLikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile.id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao
                .findTuitLikesCount(tid);
            const howManyDislikedTuit = await LikeController.likeDao
                .findTuitDislikesCount(tid);
            let tuit = await LikeController.tuitDao
                .findTuitById(tid);

            if (userAlreadyLikedTuit.lid) {
                if (userAlreadyLikedTuit.dislike) { // convert this dislike into a like
                    await LikeController.likeDao
                        .toggleIsDislike(userAlreadyLikedTuit.lid, false)
                    tuit.tuitStats.likes = howManyLikedTuit + 2;
                    tuit.tuitStats.dislikes = howManyDislikedTuit - 2;
                } else {
                    await LikeController.likeDao
                        .userUnlikesTuit(userId, tid);
                    tuit.tuitStats.likes = howManyLikedTuit - 1;
                    tuit.tuitStats.dislikes = howManyDislikedTuit + 1;
                }
            } else {
                await LikeController.likeDao
                    .userLikesTuit(userId, tid, false);
                tuit.tuitStats.likes = howManyLikedTuit + 1;
                tuit.tuitStats.dislikes = howManyDislikedTuit - 1;
            }
            await LikeController.tuitDao
                .updateStats(tid, tuit.tuitStats);
            res.sendStatus(200);
        } catch (e) { // catch a failure and report it
            res.sendStatus(404);
        }
    }

    /**
     * Parses an HTTP request, updates the amount of dislikes associated with a tuit, and then sets
     * the HTTP response appropriately if it was successful or not
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile.id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao
                .findTuitLikesCount(tid);
            const howManyDislikedTuit = await LikeController.likeDao
                .findTuitDislikesCount(tid);
            let tuit = await LikeController.tuitDao
                .findTuitById(tid);

            if (userAlreadyLikedTuit.lid) {
                if (!userAlreadyLikedTuit.dislike) { // convert this like into a dislike
                    await LikeController.likeDao
                        .toggleIsDislike(userAlreadyLikedTuit.lid, true)
                    tuit.tuitStats.likes = howManyLikedTuit - 2;
                    tuit.tuitStats.dislikes = howManyDislikedTuit + 2;
                } else { // remove altogether
                    await LikeController.likeDao
                        .userUnlikesTuit(userId, tid);
                    tuit.tuitStats.likes = howManyLikedTuit + 1;
                    tuit.tuitStats.dislikes = howManyDislikedTuit - 1;
                }
            } else {
                await LikeController.likeDao
                    .userLikesTuit(userId, tid, true);
                tuit.tuitStats.likes = howManyLikedTuit - 1;
                tuit.tuitStats.dislikes = howManyDislikedTuit + 1;
            }
            await LikeController.tuitDao
                .updateStats(tid, tuit.tuitStats);
            res.sendStatus(200);
        } catch (e) { // catch a failure and report it
            res.sendStatus(404);
        }
    }
}