import SideBarTop from './SideBarTop.tsx';
import SideBarBottom from './SideBarBottom.tsx';
import { ThreadType } from '../../types/Type.ts';
import SideBarMiddleList from './SideBarMiddleList.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootStore.ts';

type propsType = { threads: ThreadType }

const SideBar = (props: propsType) => {
  const currentTab = useSelector((state: RootState) => state.tabs.currentTab);

  return <div className={'sidebar'}>
    <SideBarTop />
    {currentTab === 'pen' && <SideBarMiddleList threads={props.threads} />}
    {currentTab !== 'pen' && <div className="sidebar-middle">
      <h1>You are currently in {currentTab} tab.</h1>
    </div>}
    <SideBarBottom />
  </div>;
};

export default SideBar;
