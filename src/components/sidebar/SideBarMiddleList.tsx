import { Fragment } from 'react';
import SideBarMiddleItem from './SideBarMiddleItem.tsx';
import { EmailType, ThreadSummary, ThreadType } from '../../types/Type.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store/rootStore.ts';
import { activateThread } from '../../store/EmailReducer.ts';
import { formatTime } from '../utils.ts';

type propsType = {
  threads: ThreadType;
}

const SideBarMiddleList = (props: propsType) => {
  const activeUserEmail = useSelector((state: RootState) => state.user.user.email);
  const dispatch: RootDispatch = useDispatch();

  const getThreadSummary = (emails: EmailType[], activeUserEmail: string): ThreadSummary => {
    if (emails.length === 0) throw new Error('Thread is empty');
    const lastEmail = emails[emails.length - 1];
    const userName = lastEmail.from.email === activeUserEmail ? 'You' : lastEmail.from.name;
    const time = formatTime(new Date(lastEmail.time));
    const emailTitle = lastEmail.title;
    const emailContent = lastEmail.message;

    const notificationsCount = emails.filter((email) => !email.isRead).length;

    return { userName, time, emailTitle, emailContent, notificationsCount };
  };

  return <div className="sidebar-middle">
    <div className="sidebar-middle--items-container">
      {!props.threads && <h1>Please email someone</h1>}
      {props.threads && Array.from(props.threads.keys()).map((item: string, i) => {
        const summary = getThreadSummary(props.threads?.get(item) || [], activeUserEmail);
        return <Fragment key={i}>
          <div className="dateBar sidebar-middle--date">{summary.time.split(',')[0]}</div>
          <div className="sidebar-middle--item-wrapper"
               onClick={() => void (dispatch(activateThread(props.threads?.get(item))))}>
            <SideBarMiddleItem
              key={i}
              emailContent={summary.emailContent}
              emailTitle={summary.emailTitle}
              time={summary.time.split(',')[1]}
              notificationsCount={summary.notificationsCount}
              userName={summary.userName}
            />
          </div>
        </Fragment>;
      })}
    </div>
  </div>;
};

export default SideBarMiddleList;