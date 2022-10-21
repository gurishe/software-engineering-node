import Follow from "./Follow";
import User from "../users/User";

export default interface FollowDaoI {
    followUser(followerId: User, followedId: User): Promise<Follow>;
    unfollowUser(followId: string): Promise<any>;
    findFollowed(followerId: string): Promise<User[]>;
    findFollowers(followingId: string): Promise<User[]>;
}