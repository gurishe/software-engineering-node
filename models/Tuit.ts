import User from "./User";

/**
 * This is based on the Assignment 1 documentation:
 * // https://docs.google.com/document/d/1zWYPxurQGwcLcNfDbIq4oBGM-VOSV13LlZgaAbq1Fek/edit
 */
export default class Tuit {
    private id: number;
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
    private isEditable: boolean = false;
    private numReplies: number = 0;
    private numLikes: number = 0;
}
