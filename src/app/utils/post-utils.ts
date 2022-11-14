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
import { PostPreviewInterface } from "../interfaces/post-preview.interface";
import { ImageInterface } from "../interfaces/image.interface";

const decodePost = (post: PostDtoInterface): Promise<PostInterface> => {
  const res: PostInterface = {
    ...post,
    creationTimestamp: moment(post.creationTimestamp),
    activeFrom: post.activeFrom ? moment(post.activeFrom) : null,
    activeTo: post.activeTo ? moment(post.activeTo) : null,
    mainImage: post.mainImage.url,
    images: post.images.map((image: ImageInterface) => image.url),
    author: null,
  };

  return axios
    .get(`/user/${post.author?.uuid}`)
    .then(({ data }) => {
      res.author = decodeUser(data);
      return res;
    })
    .catch(() => {
      return res;
    });
};

const defaultImageName = (post: PostInterface | PostPreviewInterface) => {
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

export { decodePost, defaultImageName };
