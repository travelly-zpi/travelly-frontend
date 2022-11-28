export interface ChatDtoInterface {
    uuid: string;
    userUuid: string;
    recipientUuid: string;
    recipientName: string;
    imageUrl: string;
    newMessages: number;
  }