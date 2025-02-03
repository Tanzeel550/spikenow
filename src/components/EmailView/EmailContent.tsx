import EmailContentItem from './EmailContentItem.tsx';
import { useEffect, useState } from 'react';
import { RootState } from '../../store/rootStore.ts';
import { EmailType } from '../../types/Type.ts';
import { useSelector } from 'react-redux';
import { formatTime } from '../utils.ts';


type itemType = {
  value: EmailType;
  type: 'open' | 'close';
}

const EmailContent = () => {
  const activeThread: EmailType[] = useSelector((state: RootState) => state.emails.activeThread);
  const activeUserName = useSelector((state: RootState) => state.user.user.name);
  const [itemsList, setItemsList] = useState<Array<itemType>>([]);

  useEffect(() => {
    setTimeout(() => {
      const lastElem = document.getElementById(`email-content--item-${activeThread.length - 1}`);
      lastElem?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }, [activeThread]);

  useEffect(() => {
    setItemsList(activeThread.map((item: EmailType) => ({ value: item, type: 'close' })));
  }, [activeThread]);

  const toggleItemType = (index: number) => {
    setItemsList((prevState) => {
      return prevState.map((item, i) =>
        i === index
          ? { value: item.value, type: item.type === 'open' ? 'close' : 'open' }
          : item,
      );
    });
  };

  const manipIsRead = (emailId: string) => {
    setItemsList(at => at.map((e) => e.value.emailId === emailId ? {
      value: { ...e.value, isRead: true },
      type: e.type,
    } : e));
  };

  const manipMark = (emailId: string) => {
    setItemsList(at => at.map((e) => e.value.emailId === emailId ? {
      value: { ...e.value, isMarked: !e.value.isMarked },
      type: e.type,
    } : e));
  };

  const generalizeName = (val: string) => val === activeUserName ? 'You' : val;

  return <div className="email-content">
    {itemsList && itemsList.map((item, index) =>
      <EmailContentItem
        index={index}
        // TODO: I HAVE REPEATED MESSAGE 5 TIMES AS A WORKAROUND
        srcValue={item.value.message?.repeat(5) || ''}
        type={item.type}
        changeType={() => {
          toggleItemType(index);
        }}
        // TODO: TYPICALLY ALL EMAILS ARE IN THE FORM OF HTML
        viewType={item.value.isFrame ? 'iframe' : 'string'}
        from={generalizeName(item.value.from.name)}
        to={generalizeName(item.value.to.name)}
        time={formatTime(item.value.time).split(',')[1]}
        title={item.value.title}
        emailId={item.value.emailId}
        isRead={item.value.isRead}
        setIsRead={() => manipIsRead(item.value.emailId)}
        toggleMark={() => manipMark(item.value.emailId)}
        isMarked={item.value?.isMarked || false}
      />)}
  </div>;
};
export default EmailContent;
