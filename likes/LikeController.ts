import {Express, Request, Response} from "express";
import LikeDaoI from "./LikeDaoI";
import LikeControllerI from "./LikeControllerI";

export default class LikeController implements LikeControllerI {
    private static likesController: LikeControllerI | null = null;
    private static likesDao: LikeDaoI;
    public static getInstance = (app: Express, likesDao: LikeDaoI): LikeControllerI => {
        if (LikeController.likesController === null) {
            LikeController.likesController = new LikeController();
        }
        LikeController.likesDao = likesDao;
        app.get("/api/users/:uid/likes", LikeController.likesController.findTuitsUserLiked);
        app.get("/api/tuits/:tid/likes", LikeController.likesController.findUsersThatLikedTuit);
        app.get("/api/tuits/:tid/likes/count", LikeController.likesController.findTuitLikesCount);
        app.post("/api/users/:uid/likes/:tid", LikeController.likesController.userLikesTuit);
        app.delete("/api/users/:uid/likes/:tid", LikeController.likesController.userUnlikesTuit);

        return LikeController.likesController;
    }

    private constructor() {}

    public findTuitsUserLiked = (req: Request, res: Response) =>
        LikeController.likesDao
            .findTuitsUserLiked(req.params.uid)
            .then(likes => res.json(likes));

    public findUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likesDao
            .findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    public findTuitLikesCount = (req: Request, res: Response) =>
        LikeController.likesDao
            .findTuitLikesCount(req.params.tid)
            .then(likes => res.json({likes}));

    public userLikesTuit = (req: Request, res: Response) =>
        LikeController.likesDao
            .userLikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    public userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likesDao
            .userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
}