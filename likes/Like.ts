/**
 * @file Implementation of a Like which is when a User indicates they like a specific Tuit.
 */

/**
 * A class representing a Like which is when a User likes a Tuit.
 * @property {string} id A unique ID for this object
 * @property {string} tuit The unique ID of the Tuit being liked
 * @property {string} likedBy The unique ID of the User liking the Tuit
 */
export default class Like {
    private id: string;
    private tuit: string;
    private likedBy: string;

    /**
     * Creates a Like object representing is when a User likes a Tuit.
     * @param {string} id A unique ID for this object
     * @param {string} tuit The unique ID of the Tuit being liked
     * @param {string} likedBy The unique ID of the User liking the Tuit
     */
    constructor(id: string, tuit: string, likedBy: string) {
        this.id = id;
        this.tuit = tuit;
        this.likedBy = likedBy;
    }
}