/**
 * @file This contains an implementation of the Bookmark DAO interface which handles the communication
 * with a MongoDB database to return Bookmark data stored there. The DAO leverages the mongoose Bookmark
 * model as well.
 */

import BookmarkDaoI from "./BookmarkDaoI";
import Bookmark from "./Bookmark";
import Tuit from "../tuits/Tuit";
import User from "../users/User";
import BookmarkModel from "./BookmarkModel";
import UserModel from "../users/UserModel";

/**
 * Our Bookmark DAO implementation class for handling MongoDB database accesses.
 * @property {BookmarkDao} bookmarkDao The internal DAO instance
 * @class BookmarkDao
 * @implements {BookmarkDaoI}
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates a Bookmark Dao instance if it has not already been initialized and returns the instance.
     * @return {BookmarkDao} The initialized Bookmark DAO object
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    /**
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * Creates and returns a new Bookmark object linking the User to the Tuit.
     * @param {User} user The User saving the Tuit
     * @param {Tuit} tuit The Tuit being saved
     * @return {Bookmark} The newly created Bookmark
     */
    async createBookmark(user: User, tuit: Tuit): Promise<Bookmark> {
        const model = await BookmarkModel
            .create({
                user: user.idUser,
                tuit: tuit.idTuit
            })
        return new Bookmark(model?._id.toString(), user, tuit);
    }

    /**
     * Permanently removes an existing Bookmark
     * @param bookmarkId The unique ID for the Bookmark to delete
     * @return {number} The number of records deleted
     */
    async deleteBookmark(bookmarkId: string): Promise<any> {
        return BookmarkModel.deleteOne({_id: bookmarkId});
    }

    /**
     * Locates and returns the Tuits bookmarked by a specific User.
     * @param {string} userId The unique ID for the User
     * @return {Tuit[]} An array of Tuits bookmarked by the User
     */
    async findBookmarkedTuits(userId: string): Promise<Tuit[]> {
        const model = await BookmarkModel
            .find({user: userId})
            .populate({
                path: 'tuit',
                populate: {
                    path: 'postedBy',
                    model: UserModel
                }
            })
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