/**
 * @file Implementation of a Like which is when a User indicates they like or dislike a specific Tuit.
 * This implementation enforces that a User cannot both like and dislike a tuit at the same time.
 */

/**
 * A class representing a Like which is when a User likes or dislikes a Tuit.
 * @property {string} id A unique ID for this object
 * @property {string} tuit The unique ID of the Tuit being liked
 * @property {string} likedBy The unique ID of the User liking the Tuit
 * @property {boolean} isDislike Boolean flag indicating if this like should be treated as a dislike
 */
export default class Like {
    private id: string;
    private tuit: string;
    private likedBy: string;
    private isDislike: boolean = false;

    /**
     * Creates a Like object representing is when a User likes a Tuit.
     * @param {string} id A unique ID for this object
     * @param {string} tuit The unique ID of the Tuit being liked
     * @param {string} likedBy The unique ID of the User liking the Tuit
     * @param {boolean} isDislike A flag indicating this Like is actually a dislike
     */
    constructor(id: string, tuit: string, likedBy: string, isDislike: boolean = false) {
        this.id = id;
        this.tuit = tuit;
        this.likedBy = likedBy;
        this.isDislike = isDislike;
    }

    /**
     * Gets the ID of this Like object
     * @return {string} The ID of the Like object
     */
    get lid(): string { return this.id; }

    /**
     * Gets the isDislike field of this Like object
     * @return {boolean} The isDislike field
     */
    get dislike(): boolean { return this.isDislike; }
}