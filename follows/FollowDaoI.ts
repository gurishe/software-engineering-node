/**
 * @file The interface that all of our data access objects (DAOs) dealing with
 * Follows must implement
 */

import Follow from "./Follow";
import User from "../users/User";

/**
 * The interface for any Follow DAOs
 * @interface FollowDaoI
 */
export default interface FollowDaoI {
    followUser(follower: User, followed: User): Promise<Follow>;
    unfollowUser(followId: string): Promise<any>;
    findFollowed(followerId: string): Promise<User[]>;
    findFollowers(followingId: string): Promise<User[]>;
}