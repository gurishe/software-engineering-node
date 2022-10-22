/**
 * @file Implementation of a Message which is when a User sends a text message to another User.
 */

import User from "../users/User";

/**
 * A class representing a message between two Users.
 * @property {string} id A unique ID for this object
 * @property {User} sender The User sending the message
 * @property {User} recipient The User receiving the message
 * @property {string} message The text message being sent
 * @property {Date} sentOn The date the message is sent
 */
export default class Message {
    private id: string;
    private sender: User | null;
    private recipient: User | null;
    private message: string;
    private sentOn: Date;

    /**
     * Creates a new Message representing a text exchange between two Users.
     * @param {string} id A unique ID for this object
     * @param {User} sender The User sending the message
     * @param {User} recipient The User receiving the message
     * @param {string} message The text message being sent
     * @param {Date} sentOn The date the message is sent
     */
    constructor(
        id: string,
        message: string,
        sentOn: Date = new Date(),
        sender: User | null = null,
        recipient: User | null = null
    ) {
        this.id = id;
        this.message = message;
        this.sentOn = sentOn;
        this.sender = sender;
        this.recipient = recipient;
    }
}