import FollowControllerI from "./FollowControllerI";
import FollowDaoI from "./FollowDaoI";
import {Express, Request, Response} from "express";

export default class FollowController implements FollowControllerI {
    private static followController: FollowControllerI | null = null;
    private static followDao: FollowDaoI;

    public static getInstance = (app: Express, followDao: FollowDaoI): FollowControllerI => {
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

    private constructor() {}

    followUser = (req: Request, res: Response) =>
        FollowController.followDao
            .followUser(req.body.follower, req.body.followed)
            .then(follow => res.json(follow));

    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao
            .unfollowUser(req.params.fid)
            .then(result => res.json(result));

    findFollowed = (req: Request, res: Response) =>
        FollowController.followDao
            .findFollowed(req.params.uid)
            .then(users => res.json(users));

    findFollowers = (req: Request, res: Response) =>
        FollowController.followDao
            .findFollowers(req.params.uid)
            .then(users => res.json(users));
}