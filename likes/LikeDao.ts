import likeModel from "./LikeModel";
import LikeDaoI from "./LikeDaoI";
import Tuit from "../tuits/Tuit";
import User from "../users/User";
import Like from "./Like";

export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDaoI | null = null;
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    public async findTuitsUserLiked(uid: string): Promise<Tuit[]> {
        const model = await likeModel
            .find({likedBy: uid})
            .populate('likedTuit')
            .populate('likedBy')
            .exec();
        return model.map(tuitModel =>
            new Tuit(
                tuitModel?.likedTuit?._id.toString() ?? '',
                tuitModel?.likedTuit?.tuit ?? '',
                new Date(tuitModel?.likedTuit?.postedOn ?? (new Date()))
            )
        );
    }

    public async findUsersThatLikedTuit(tid: string): Promise<User[]> {
        const model = await likeModel
            .find({likedTuit: tid})
            .populate('likedTuit')
            .populate('likedBy')
            .exec();
        return model.map(user =>
            new User(
                user?.likedBy?._id.toString() ?? '',
                user?.likedBy?.username ?? '',
                user?.likedBy?.password ?? ''
            )
        );
    }

    public async findTuitLikesCount(tid: string): Promise<any> {
        return likeModel
            .find({likedTuit: tid})
            .count();
    }

    public async userLikesTuit(uid: string, tid: string): Promise<Like> {
        const model = await likeModel
            .create({likedTuit: tid, likedBy: uid});
        return new Like(
            model?._id.toString() ?? '',
            model?.likedTuit?.toString() ?? '',
            model?.likedBy?.toString() ?? ''
        );
    }

    public async userUnlikesTuit(uid: string, tid: string): Promise<any> {
        return likeModel
            .deleteOne({likedTuit: tid, likedBy: uid});
    }
}
