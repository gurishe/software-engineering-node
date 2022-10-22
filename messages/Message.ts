import User from "../users/User";

export default class Message {
    private id: string;
    private sender: User | null;
    private recipient: User | null;
    private message: string;
    private sentOn: Date;

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

    get idMessage() { return this.id };
    set sent(user: User | null) { this.sender = user };
    set received(user: User | null) { this.recipient = user };
}