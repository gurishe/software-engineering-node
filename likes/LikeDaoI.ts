/**
 * @file The interface that all of our data access objects (DAOs) dealing with
 * Likes must implement
 */

import Like from "./Like"
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * The interface for any Like DAOs
 * @interface LikeDaoI
 */
export default interface LikeDaoI {
    findTuitsUserLiked(uid: string): Promise<Tuit[]>;
    findUsersThatLikedTuit(tid: string): Promise<User[]>;
    findTuitLikesCount(tid: string): Promise<any>;
    findUserLikesTuit(uid: string, tid: string): Promise<Like>;
    userLikesTuit(uid: string, tid: string): Promise<Like>;
    userUnlikesTuit(uid: string, tid: string): Promise<any>;
}
