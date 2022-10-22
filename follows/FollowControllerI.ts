/**
 * @file The interface that all of our controllers dealing with Follows must implement
 */

import {Request, Response} from "express";

/**
 * The interface for our Follow controllers
 * @interface FollowControllerI
 */
export default interface FollowControllerI {
    followUser(req: Request, res: Response): void;
    unfollowUser(req: Request, res: Response): void;
    findFollowed(req: Request, res: Response): void;
    findFollowers(req: Request, res: Response): void;
}