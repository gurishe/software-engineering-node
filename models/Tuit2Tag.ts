import Tuit from "./Tuit";
import Tag from "./Tag";

export default class Tuit2Tag {
    private tuit: Tuit;
    private tag: Tag;

    public constructor(tuit: Tuit, tag: Tag) {
        this.tuit = tuit;
        this.tag = tag;
    }
}