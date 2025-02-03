import EmailTopBar from './EmailTopBar.tsx';
import EmailDayBar from './EmailDayBar.tsx';
import EmailContent from './EmailContent.tsx';
import EmailReplyBar from './EmailReplyBar.tsx';

const EmailView: React.FC = () => {
  return (
    <div className="emailView">
      <EmailTopBar />
      <EmailDayBar />
      <EmailContent />
      <EmailReplyBar />
    </div>
  );
};

export default EmailView;
