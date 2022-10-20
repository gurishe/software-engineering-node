import Like from "./Like"
import Tuit from "../tuits/Tuit";
import User from "../users/User";

export default interface LikeDaoI {
    findTuitsUserLiked(uid: string): Promise<Tuit[]>;
    findUsersThatLikedTuit(tid: string): Promise<User[]>;
    findTuitLikesCount(tid: string): Promise<any>;
    userLikesTuit(uid: string, tid: string): Promise<Like>;
    userUnlikesTuit(uid: string, tid: string): Promise<any>;
}
