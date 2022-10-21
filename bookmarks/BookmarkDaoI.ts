import Bookmark from "./Bookmark";
import Tuit from "../tuits/Tuit";
import User from "../users/User";

export default interface BookmarkDaoI {
    createBookmark(user: User, tuit: Tuit): Promise<Bookmark>;
    deleteBookmark(bookmarkId: string): Promise<any>;
    findBookmarkedTuits(userId: string): Promise<Tuit[]>
}
