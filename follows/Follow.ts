import User from "../users/User";

export default class Follow {
    private id: string;
    private follower: User;
    private followed: User;

    constructor(id: string, follower: User, followed: User) {
        this.id = id;
        this.follower = follower;
        this.followed = followed;
    }
}