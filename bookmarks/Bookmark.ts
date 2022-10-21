import Tuit from "../tuits/Tuit";
import User from "../users/User";

export default class Bookmark {
    private id: string;
    private tuit: Tuit;
    private user: User;

    constructor(id: string, user: User, tuit: Tuit) {
        this.id = id;
        this.user = user;
        this.tuit = tuit;
    }
}