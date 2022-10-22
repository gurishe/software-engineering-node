/**
 * @file Implementation of a Follow which is when following User tracks new Tuits from a followed User.
 */

import User from "../users/User";

/**
 * A class representing a Follow which is when a User tracks another User.
 * @property {string} id A unique ID for this object
 * @property {User} follower The User object initiating the follow
 * @property {User} followed The User object being followed
 */
export default class Follow {
    private id: string;
    private follower: User;
    private followed: User;

    /**
     * Creates a Follow object representing when a User tracks another User.
     * @param {string} id A unique ID for this object
     * @param {User} follower The User object initiating the follow
     * @param {User} followed The User object being followed
     */
    constructor(id: string, follower: User, followed: User) {
        this.id = id;
        this.follower = follower;
        this.followed = followed;
    }
}