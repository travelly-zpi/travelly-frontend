export interface PostParamsInterface {
  page: number;
  size: number;
  active?: boolean;
  activeFrom?: string;
  activeTo?: string;
  participants?: number;
  startPoint?: string;
  endPoint?: string;
  author?: string;
  notAuthor?: string;
  type?: string;
}
