import {
  Archive,
  BellSlash,
  Calendar,
  CalendarCheck,
  CheckSquare,
  Clock,
  DotsThree,
  Eye,
  Folder,
  List,
  Phone,
  Prohibit,
  PushPin,
  Star,
  Trash,
  VideoCamera,
} from '@phosphor-icons/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../store/rootStore.ts';
import { closePopup } from '../store/MenuReducer.ts';
import { useEffect, useState } from 'react';

const Popup = () => {
  const size = 24;
  const popupState = useSelector((state: RootState) => state.popup);
  const [firstClick, setFirstClick] = useState<boolean>(false);
  const dispatch: RootDispatch = useDispatch();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closePopup());
    };
    document.addEventListener('keydown', handler);
    setFirstClick(false);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      e.stopImmediatePropagation();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const t = e.target?.closest('.popup');
      if (!t && popupState.show && !firstClick) setFirstClick(true);
      else if (!t && popupState.show && firstClick) {
        dispatch(closePopup());
        setFirstClick(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [popupState.show, firstClick]);

  return (<div className="popup" style={{
    display: popupState.show === true ? 'flex' : 'none',
    top: (500 + popupState.top) > window.innerHeight ? popupState.top - 500 : popupState.top,
    left: popupState.left + 200 > window.innerWidth ? popupState.left - 400 : popupState.left,
  }}>
    <span className="popup__cross" onClick={() => void (dispatch(closePopup()))}>X</span>

    <div className="popup__item">
      <Eye className="popup__icon" size={size} />
      <p className="popup__text">Read</p>
    </div>
    <div className="popup__item">
      <Star className="popup__icon" size={size} />
      <p className="popup__text">Star</p>
    </div>
    <div className="popup__item">
      <Archive className="popup__icon" size={size} />
      <p className="popup__text">Archive</p>
    </div>
    <div className="popup__item">
      <Trash className="popup__icon" size={size} />
      <p className="popup__text">Trash all</p>
    </div>
    <div className="popup__divider"></div>


    <div className="popup__item">
      <Clock className="popup__icon" size={size} />
      <p className="popup__text">Later</p>
    </div>
    <div className="popup__item">
      <Clock className="popup__icon" size={size} />
      <p className="popup__text">Tomorrow</p>
    </div>
    <div className="popup__item">
      <Calendar className="popup__icon" size={size} />
      <p className="popup__text">Next week</p>
    </div>
    <div className="popup__item">
      <CalendarCheck className="popup__icon" size={size} />
      <p className="popup__text">Pick</p>
    </div>
    <div className="popup__divider"></div>


    <div className="popup__item">
      <Folder className="popup__icon" size={size} />
      <p className="popup__text">Move</p>
    </div>
    <div className="popup__item">
      <PushPin className="popup__icon" size={size} />
      <p className="popup__text">Pin</p>
    </div>
    <div className="popup__item">
      <DotsThree className="popup__icon" size={size} />
      <p className="popup__text">Other</p>
    </div>
    <div className="popup__item">
      <BellSlash className="popup__icon" size={size} />
      <p className="popup__text">Mute</p>
    </div>
    <div className="popup__divider"></div>


    <div className="popup__item popup__item--full">
      <CheckSquare className="popup__icon" size={size} />
      <p className="popup__text">Auto Archive</p>
    </div>
    <div className="popup__item popup__item--full">
      <Prohibit className="popup__icon" size={size} />
      <p className="popup__text">Block</p>
    </div>
    <div className="popup__item popup__item--full">
      <List className="popup__icon" size={size} />
      <p className="popup__text">Smart Summary</p>
    </div>
    <div className="popup__divider"></div>


    <div className="popup__item popup__item--full popup__item--call">
      <p className="popup__text popup__text--call">Call Now</p>
      <VideoCamera className="popup__icon popup__icon--call" size={size} />
      <Phone className="popup__icon popup__icon--call" size={size} />
    </div>
  </div>);
};

export default Popup;
