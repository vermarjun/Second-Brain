import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {type : String, required: true, unique: true},
    password: {type : String, required: true},
});

const contentTypes = ["video", "document", "article", "audio", "image"]

const TagSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

const ContentSchema = new Schema({
    type: {type: String, enum: contentTypes, required: true},
    link: {type: String, required: true},
    title: {type: String, required: true},
    tags: [{type: Types.ObjectId, ref: 'Tag'}],
    userId: {type: Types.ObjectId, ref: 'User', required: true},
});

const LinkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: Types.ObjectId, ref: "User", requried: true},
})

const UserModel = mongoose.model("User",UserSchema);
const TagModel = mongoose.model("Tags" , TagSchema);
const ContentModel = mongoose.model("Content", ContentSchema);
const LinkModel = mongoose.model("Link", LinkSchema);

export {
    UserModel,
    TagModel,
    ContentModel,
    LinkModel
}