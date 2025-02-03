import { ChatCircle, Clock, PencilSimple, Star, Users } from '@phosphor-icons/react';
import { RootDispatch, RootState } from '../../store/rootStore';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTab } from '../../store/TabsReducer.ts';

const SideBarBottom = () => {
  const currentTab = useSelector((state: RootState) => state.tabs.currentTab);
  const dispatch: RootDispatch = useDispatch();
  const iconSize = 24;

  return <div className="sidebar-bottom">
    {/*<div className="sidebar-bottom--icons-wrapper">*/}
    <div className="sidebar-bottom--icons-list">
      <ChatCircle
        size={iconSize}
        className={`sidebar-bottom--icon ${currentTab === 'message' && 'colored'}`}
        onClick={() => void (dispatch(setCurrentTab('message')))}
      />
      <Clock
        size={iconSize}
        className={`sidebar-bottom--icon ${currentTab === 'clock' && 'colored'}`}
        onClick={() => void (dispatch(setCurrentTab('clock')))}
      />
      <PencilSimple
        size={iconSize}
        className={`sidebar-bottom--icon ${currentTab === 'pen' && 'colored'}`}
        onClick={() => void (dispatch(setCurrentTab('pen')))}
      />
      <Star
        size={iconSize}
        className={`sidebar-bottom--icon ${currentTab === 'star' && 'colored'}`}
        onClick={() => void (dispatch(setCurrentTab('star')))}
      />
      <Users
        size={iconSize}
        className={`sidebar-bottom--icon ${currentTab === 'people' && 'colored'}`}
        onClick={() => void (dispatch(setCurrentTab('people')))}
      />
    </div>
    {/*</div>*/}
  </div>;
};

export default SideBarBottom;
