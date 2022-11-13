export interface PostParamsInterface {
  page: number;
  size: number;
  active?: boolean;
  startDate?: string;
  endDate?: string;
  participants?: number;
  startPoint?: string;
  endPoint?: string;
  author?: string;
  notAuthor?: string;
  type?: string;
}
