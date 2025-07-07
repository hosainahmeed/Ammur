export interface Conversation {
  _id: string;
  familyName: string;
  img: string;
  timestamp?: string;
}

export interface Message {
  _id: string;
  text: string;
  sender: string;
  timestamp?: string;
  avatar: string;
  isCurrentUser: boolean;
  file?: {
    name: string;
    type: string;
    url: string;
    size?: string;
  };
}

export interface UserStatus {
  userId: string;
  status: 'online' | 'offline';
}