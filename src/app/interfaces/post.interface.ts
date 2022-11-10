export interface PostInterface {
    title: string;
    description: string;
    activeFrom: moment.Moment | null;
    activeTo: moment.Moment | null;
    type: string;
    active: boolean;
    participants: number | null;
    startPoint: string | null;
    endPoint: string | null;
    author: string;
  }