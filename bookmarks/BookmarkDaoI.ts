/**
 * @file The interface that all of our data access objects (DAOs) dealing with
 * Bookmarks must implement
 */

import Bookmark from "./Bookmark";
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * The interface for any Bookmark DAOs
 * @interface BookmarkDaoI
 */
export default interface BookmarkDaoI {
    createBookmark(user: User, tuit: Tuit): Promise<Bookmark>;
    deleteBookmark(bookmarkId: string): Promise<any>;
    findBookmarkedTuits(userId: string): Promise<Tuit[]>
}
