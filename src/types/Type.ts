export type EmailType = {
  emailId: string;
  from: {
    name: string,
    email: string,
  },
  to: {
    name: string,
    email: string,
  },
  time: Date | string,
  title: string,
  isRead: boolean,
  message: string,
  isFrame?: boolean,
  isMarked?: boolean
}

export type ThreadType = Map<string, EmailType[]> | undefined;

export type UserType = {
  name: string,
  email: string,
}

export type ThreadSummary = {
  userName: string;
  time: string;
  emailTitle: string;
  emailContent: string;
  notificationsCount: number;
};

export type TabsListType = 'pen' | 'star' | 'clock' | 'people' | 'message';

export type PopupType = {
  top: number;
  left: number;
  show?: boolean;
}