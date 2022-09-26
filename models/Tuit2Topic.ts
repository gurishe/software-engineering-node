import Tuit from "./Tuit";
import Topic from "./Topic";

export default class Tuit2Tag {
    private tuit: Tuit;
    private topic: Topic;

    public constructor(tuit: Tuit, topic: Topic) {
        this.tuit = tuit;
        this.topic = topic;
    }
}