export interface Queue {
  id: number;
  queue_name: string;
  instance: string;
  status: boolean;
  verification_date?: Date;
  connection_date?: Date;
  waiting_chats?: number;
}

export interface SearchExternalQueue {
  url: string;
  apiKey: string;
}