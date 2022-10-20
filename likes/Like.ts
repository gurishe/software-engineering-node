export default class Like {
    private id: string;
    private tuit: string;
    private likedBy: string;

    constructor(id: string, tuit: string, likedBy: string) {
        this.id = id;
        this.tuit = tuit;
        this.likedBy = likedBy;
    }
}