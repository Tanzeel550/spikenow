import { ArrowsOutSimple, FilePlus, PaperPlaneTilt, PlusCircle, Smiley, X } from '@phosphor-icons/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store/rootStore.ts';
import { addEmail } from '../../store/EmailReducer.ts';

const EmailReplyBar = () => {
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('Great Ho Gaya Yaar');
  const dispatch: RootDispatch = useDispatch();
  const allEmails = useSelector((state: RootState) => state.emails.emails);
  const currentThread = useSelector((state: RootState) => state.emails.activeThread);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const size = 24;

  const handleSubmit = () => {
    if (title === '' || replyMessage === '') return;
    dispatch(addEmail({
      from: { email: currentUser.email, name: currentUser.name },
      isFrame: false,
      isRead: true,
      message: replyMessage,
      title: title,
      // TODO:
      to: {
        email: currentThread[0]?.from.email || currentUser.email,
        name: currentThread[0]?.from.name || currentUser.name,
      },
      emailId: `${+allEmails[allEmails.length - 1].emailId + 1}`,
      time: new Date(),
    }));
    setReplyMessage('');
    setTitle('Great Ho Gaya Yaar');
  };

  return <div className="email-replyBar" onKeyDown={(e) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e.key === 'Enter' && handleSubmit();
  }}>
    <div className="email-replyBar--left">
      <div className="email-replyBar--left-content">
        <input
          type="text"
          placeholder="↰ Type Something"
          value={replyMessage}
          className="email-replyBar--left-input"
          onChange={(e) => void (setReplyMessage(e.target.value))}
          required={true}
        />

        <div className="email-replyBar--left-input--sink" style={{
          display: replyMessage === '' ? 'none' : 'flex',
        }}>
          <X size={12} className="fazool" onClick={() => void (setReplyMessage(''))} />
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => void (setTitle(e.target.value))}
            required={true}
          />
        </div>
      </div>
    </div>
    <div className="email-replyBar--right">
      <div className="email-replyBar--right-icon">
        <ArrowsOutSimple size={size} />
      </div>
      <div className="email-replyBar--right-icon">
        <PlusCircle size={size} />
      </div>
      <div className="email-replyBar--right-icon">
        <Smiley size={size} />
      </div>
      <div className="email-replyBar--right-icon pinky">
        <FilePlus size={size} />
      </div>
      <div className="email-replyBar--right-icon" style={{
        color: replyMessage === '' ? 'var(--color-grey)' : 'var(--color-white)',
        backgroundColor: replyMessage === '' ? 'var(--color-white)' : 'var(--color-blue)',
        borderRadius: replyMessage === '' ? '0' : '50%',
      }}>
        <PaperPlaneTilt size={size} onClick={handleSubmit} />
      </div>
    </div>
  </div>;
};

export default EmailReplyBar;
