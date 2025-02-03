import { useEffect, useState } from 'react';
import { Check, Circle, DotsThree } from '@phosphor-icons/react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '../../store/rootStore.ts';
import { openPopup } from '../../store/MenuReducer.ts';


type propsType = {
  userName: string, time: string, emailTitle: string, emailContent: string, notificationsCount: number, key: number
}

const SideBarMiddleItem = (props: propsType) => {
  const [paragraphWidth, setParagraphWidth] = useState(0);
  const dispatch: RootDispatch = useDispatch();

  useEffect(() => {
    const w = document.querySelector('.sidebar-middle--info')?.getBoundingClientRect().width;
    setParagraphWidth(w || 0);
  }, []);


  return <div className="sidebar-middle--item"
              onMouseEnter={() => setParagraphWidth(prevState => prevState - 20)}
              onMouseLeave={() => setParagraphWidth(prevState => prevState + 20)}>
    <div className="sidebar-middle--photo">
      <p>{props.userName.charAt(0).toUpperCase()}</p>
    </div>
    <div className="sidebar-middle--info">
      <div className="sidebar-middle--info-name">{props.userName}
        <p className="sidebar-middle--info-name-time">{props.time}</p>
      </div>
      <div className="sidebar-middle--info-note">{props.emailTitle}
        {props.notificationsCount && <p className="sidebar-middle--info-note-count">{props.notificationsCount}</p>
        }
      </div>
      <div className="sidebar-middle--info-paragraph" style={{
        width: paragraphWidth,
      }}>{props.emailContent}</div>
    </div>

    <div className="sidebar-middle--action-icons">
      <DotsThree size={18} className="sidebar-middle--action-icon" onClick={(e) => {
        // @ts-ignore
        const coordinates = e.target.getBoundingClientRect();
        dispatch(openPopup({ left: coordinates.left, top: coordinates.top }));
      }} />
      {/* TODO: HIDE 2ND ELEMENT IF THERE IS NOTIFICATION PRESENT*/}
      <Circle size={18} className="sidebar-middle--action-icon" style={{
        opacity: props.notificationsCount > 1 ? 0 : 1, backgroundColor: 'rgb(0,0,0,0)',
      }} />
      <Check size={18} className="sidebar-middle--action-icon" />
    </div>
  </div>;
};

export default SideBarMiddleItem;