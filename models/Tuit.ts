import User from "./User";

/**
 * This is based on the Assignment 1 documentation:
 * // https://docs.google.com/document/d/1zWYPxurQGwcLcNfDbIq4oBGM-VOSV13LlZgaAbq1Fek/edit
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;

    public constructor(tuit: string, postedBy: User | null, postedOn: Date | null = null) {
        this.tuit = tuit;
        this.postedBy = postedBy;
        if (postedOn !== null) {
            this.postedOn = postedOn
        }
    }

    get tuitBody(): string {
        return this.tuit;
    }

    get date(): Date {
        return this.postedOn;
    }

    get user(): User | null {
        return this.postedBy
    }
}
