import { PostDtoInterface } from "../interfaces/post-dto.interface";
import { PostInterface } from "../interfaces/post.interface";
import moment from "moment";

const decodePost = (post: PostDtoInterface): PostInterface => {
  return {
    ...post,
    creationTimestamp: moment(post.creationTimestamp),
    activeFrom: moment(post.activeFrom),
    activeTo: moment(post.activeTo),
  };
};

const encodePost = (post: PostInterface): PostDtoInterface => {
  return {
    ...post,
    creationTimestamp: post.creationTimestamp.format("YYYY-MM-DD"),
    activeFrom: post.activeFrom.format("YYYY-MM-DD"),
    activeTo: post.activeTo.format("YYYY-MM-DD"),
  };
};

export { decodePost, encodePost };
