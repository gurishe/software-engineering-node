/**
 * @file Implementation of a Bookmark which is when a User saves a Tuit.
 */

import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * A class representing a Bookmark which is when a User saves a Tuit.
 * @property {string} id A unique ID for this object
 * @property {Tuit} tuit The Tuit object being saved
 * @property {User} user The User object saving the Tuit
 */
export default class Bookmark {
    private id: string;
    private tuit: Tuit;
    private user: User;

    /**
     * Creates a new Bookmark object
     * @param {string} id A unique ID for this object
     * @param {Tuit} tuit The Tuit object being saved
     * @param {User} user The User object saving the Tuit
     */
    constructor(id: string, user: User, tuit: Tuit) {
        this.id = id;
        this.user = user;
        this.tuit = tuit;
    }
}