import {Request, Response} from "express";

export default interface FollowControllerI {
    followUser(req: Request, res: Response): void;
    unfollowUser(req: Request, res: Response): void;
    findFollowed(req: Request, res: Response): void;
    findFollowers(req: Request, res: Response): void;
}