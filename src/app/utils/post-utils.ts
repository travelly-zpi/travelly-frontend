import { PostDtoInterface } from "../interfaces/post-dto.interface";
import { PostInterface } from "../interfaces/post.interface";
import moment from "moment";
import Accommodation from "app/assets/img/post/accommodation.png";
import Carpooling from "app/assets/img/post/carpooling.png";
import Excursion from "app/assets/img/post/excursion.png";
import Trip from "app/assets/img/post/trip.png";
import Other from "app/assets/img/post/other.png";
import axios from "axios";
import { decodeUser } from "./user-utils";

const decodePost = (post: PostDtoInterface): Promise<PostInterface> => {
  return axios
    .get(`/user/${post.author.uuid}`)
    .then(({ data }) => {
      return {
        ...post,
        creationTimestamp: moment(post.creationTimestamp),
        activeFrom: moment(post.activeFrom),
        activeTo: moment(post.activeTo),
        author: decodeUser(data),
      };
    })
    .catch(() => {
      return {
        ...post,
        creationTimestamp: moment(post.creationTimestamp),
        activeFrom: moment(post.activeFrom),
        activeTo: moment(post.activeTo),
        author: null,
      };
    });
};

const encodePost = (post: PostInterface): PostDtoInterface => {
  return {
    ...post,
    creationTimestamp: post.creationTimestamp.format("YYYY-MM-DD"),
    activeFrom: post.activeFrom.format("YYYY-MM-DD"),
    activeTo: post.activeTo.format("YYYY-MM-DD"),
    author: {
      uuid: post.author?.uuid,
      email: post.author?.email,
    },
  };
};

const defaultImageName = (post: PostInterface) => {
  switch (post.type) {
    case "accommodation":
      return Accommodation;
    case "carpooling":
      return Carpooling;
    case "excursion":
      return Excursion;
    case "trip":
      return Trip;
    default:
      return Other;
  }
};

export { decodePost, encodePost, defaultImageName };
