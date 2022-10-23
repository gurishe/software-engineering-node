/**
 * @file This contains an implementation of our Follow Controller Interface which is used
 * with Express to establish our API URIs and parse incoming HTTP messages to be passed off
 * to a data access object (DAO).
 */

import FollowControllerI from "./FollowControllerI";
import FollowDaoI from "./FollowDaoI";
import {Express, Request, Response} from "express";
import User from "../users/User";

/**
 * Our Follow controller implementation class for parsing HTTP requests and return JSON responses.
 * @property {FollowController} followController The internal controller instance
 * @property {FollowDao} followDao The internal DAO instance
 * @class FollowController
 * @implements {FollowControllerI}
 */
export default class FollowController implements FollowControllerI {
    private static followController: FollowController | null = null;
    private static followDao: FollowDaoI;

    /**
     * Creates or returns an instance of the Follow Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Express} app The Express object that handles the HTTP parsing and responding
     * @param {FollowDao} followDao The DAO that handles communications with the remote database
     * @return {FollowController} The initialized Follower Controller object
     */
    public static getInstance = (app: Express, followDao: FollowDaoI): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
        }
        FollowController.followDao = followDao;
        app.post('/api/users/:uidFollower/follows/:uidFollowed', FollowController.followController.followUser);
        app.delete('/api/follows/:fid', FollowController.followController.unfollowUser);
        app.get('/api/users/:uid/following', FollowController.followController.findFollowed);
        app.get('/api/users/:uid/followers', FollowController.followController.findFollowers);


        return FollowController.followController;
    }

    /**
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * Parses an HTTP request and adds a JSON version of the newly created Follow to the HTTP
     * response. Expects two Users and a string message in the HTTP request body.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    followUser = (req: Request, res: Response) =>
        FollowController.followDao
            .followUser(
                new User(
                    req.params.uidFollower,
                    req.body.follower.username,
                    req.body.follower.password
                ),
                new User(
                    req.params.uidFollowed,
                    req.body.followed.username,
                    req.body.followed.password
                )
            )
            .then(follow => res.json(follow));

    /**
     * Parses an HTTP request and adds a JSON version of the status of the delete request to the HTTP
     * response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao
            .unfollowUser(req.params.fid)
            .then(result => res.json(result));

    /**
     * Parses an HTTP request and adds a JSON formatted array of Users to the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findFollowed = (req: Request, res: Response) =>
        FollowController.followDao
            .findFollowed(req.params.uid)
            .then(users => res.json(users));

    /**
     * Parses an HTTP request and adds a JSON formatted array of Users to the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findFollowers = (req: Request, res: Response) =>
        FollowController.followDao
            .findFollowers(req.params.uid)
            .then(users => res.json(users));
}