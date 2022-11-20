/**
 * @file The interface that all of our controllers dealing with Likes must implement
 */

import {Request, Response} from "express";

/**
 * The interface for our Like controllers
 * @interface LikeControllerI
 */
export default interface LikeControllerI {
    findTuitsUserLiked(req: Request, res: Response): void;
    findUsersThatLikedTuit(req: Request, res: Response): void;
    findTuitLikesCount(req: Request, res: Response): void;
    findUserLikesTuit(req: Request, res: Response): void;
    userLikesTuit(req: Request, res: Response): void;
    userUnlikesTuit(req: Request, res: Response): void;
    userTogglesTuitLikes(req: Request, res: Response): void;
    userTogglesTuitDislikes(req: Request, res: Response): void;
}