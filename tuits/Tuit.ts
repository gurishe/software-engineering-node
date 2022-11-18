/**
 * @file Implementation of a Tuit which is text-based post made by a User.
 */

import User from "../users/User";

/**
 * A class representing a text post made by a User.
 * @property {string} id A unique ID for this object
 * @property {string} tuit The text body being posted
 * @property {User} postedBy The User making the post
 * @property {Date} postedOn The date the post is made
 */
export default class Tuit {
    private id: string;
    private tuit: string;
    private postedOn: Date;
    private postedBy: User | null;
    private stats: object;

/**
     * Creates a new Tuit object representing a post made by a User.
     * @param {string} id A unique ID for this object
     * @param {string} tuit The text body being posted
     * @param {Date} postedOn The date the post is made
     */
    constructor(id: string, tuit: string, postedOn: Date) {
        this.id = id;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = null;
        this.stats = {
            replies: 0,
            retuits: 0,
            likes: 0
        };
    }

    /**
     * Sets the author of a post
     * @param {User} user The User who authored the Tuit post
     */
    public set author(user: User | null) { this.postedBy = user; }

    /**
     * Gets the author of the Tuit
     * @return {User} The author of the post
     */
    public get author(): User | null { return this.postedBy; }

    /**
     * Gets the text body of the Tuit
     * @return {string} The body of the Tuit
     */
    public get post(): string { return this.tuit; }

    /**
     * Gets the unique ID of the Tuit
     * @return {string} The unique ID of the Tuit
     */
    public get idTuit(): string { return this.id; }

    /**
     * Updates the stats of the Tuit
     * @return {object} The stats held by the Tuit
     */
    public get tuitStats(): object { return this.stats; }

    /**
     * Sets the stats object of the Tuit
     * @param {object} stats The statistics for this tuit, such as number of likes or replies
     */
    public set setStats(stats: object) { this.stats = stats; }
}
