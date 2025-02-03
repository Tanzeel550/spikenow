import {
  CaretLeft,
  CaretRight,
  CheckSquare,
  DotsThreeVertical,
  MagnifyingGlass,
  VideoCamera,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootStore.ts';

const EmailTopBar = () => {
  const [animation, setAnimation] = useState<boolean>(false);
  const activeThread = useSelector((state: RootState) => state.emails.activeThread);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const size = 24;
  return <div className="email-topBar">
    <div className="email-topBar--left">
      <div className="backIcon">
        <CaretLeft size={32} />
      </div>
      <div className="email-topBar--left-container">
        <div className="email-topBar--left-from">{activeThread[0]?.from.name || currentUser.name}</div>
        <div className="email-topBar--left-contact">Contact Now
          <CaretRight size={12} className="email-topBar--left-contact-icon" />
        </div>
      </div>
    </div>
    <div className="email-topBar--right">
      <div className="email-topBar--right-icon">
        <MagnifyingGlass size={size} onClick={() => {
          setAnimation(prevState => !prevState);
        }} />
        <input type="text"
               className={`email-topBar--right-input ${animation && 'email-topBar--right-input--animate'}`} />
      </div>
      <div className="email-topBar--right-icon">
        <VideoCamera size={size} />
      </div>
      <div className="email-topBar--right-icon">
        <CheckSquare size={size} />
      </div>
      <div className="email-topBar--right-icon">
        <DotsThreeVertical size={size} />
      </div>
    </div>
  </div>;
};
export default EmailTopBar;
