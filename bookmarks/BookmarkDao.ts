import BookmarkDaoI from "./BookmarkDaoI";
import Bookmark from "./Bookmark";
import Tuit from "../tuits/Tuit";
import User from "../users/User";
import BookmarkModel from "./BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDaoI | null = null;

    public static getInstance = (): BookmarkDaoI => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    async createBookmark(user: User, tuit: Tuit): Promise<Bookmark> {
        const model = await BookmarkModel
            .create({
                user: user.idUser,
                tuit: tuit.idTuit
            })
        return new Bookmark(model?._id.toString(), user, tuit);
    }

    async deleteBookmark(bookmarkId: string): Promise<any> {
        return BookmarkModel.deleteOne({_id: bookmarkId});
    }

    async findBookmarkedTuits(userId: string): Promise<Tuit[]> {
        const model = await BookmarkModel
            .find({user: userId})
            .populate('tuit')
            .populate('postedBy')
            .exec();
        return model.map(bookmark => {
            const author = new User(
                bookmark?.tuit?.postedBy?._id.toString() ?? '',
                bookmark?.tuit?.postedBy?.username ?? '',
                bookmark?.tuit?.postedBy?.password ?? ''
            );
            const tuit = new Tuit(
                bookmark?.tuit?._id.toString() ?? '',
                bookmark?.tuit?.tuit ?? '',
                new Date(bookmark?.tuit?.postedOn ?? (new Date()))
            );
            tuit.author = author;
            return tuit;
        });
    }
}