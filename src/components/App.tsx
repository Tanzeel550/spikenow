import { EmailType, ThreadType } from '../types/Type.ts';
import SideBar from './sidebar/SideBar.tsx';
import EmailView from './EmailView/EmailView.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootStore.ts';
import { useEffect, useState } from 'react';
import Popup from './Popup.tsx';

const App = () => {
  const emails: EmailType[] = useSelector((state: RootState) => state.emails.emails);
  const [threads, setThreads] = useState<ThreadType>();

  const groupEmailsByConversation = (emails: EmailType[]): ThreadType => {
    const conversationMap = new Map<string, EmailType[]>();

    emails.forEach((email) => {
      const participants = [email.from.email, email.to.email].sort().join('-');
      if (!conversationMap.has(participants)) conversationMap.set(participants, []);
      conversationMap.get(participants)!.push(email);
    });
    return conversationMap;
  };

  useEffect(() => {
    setThreads(groupEmailsByConversation(emails));
  }, [emails]);

  return <div className="view">
    <Popup />
    <SideBar threads={threads} />
    <EmailView />
  </div>;
};


export default App;
