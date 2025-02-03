import {Funnel, MagnifyingGlass} from "@phosphor-icons/react"
import { RootState } from '../../store/rootStore.ts';
import { useSelector } from 'react-redux';

const SideBarTop = () => {
  const currentUser = useSelector((state:RootState)=>state.user.user)
  const profilePhoto = "https://www.aljazeera.com/wp-content/uploads/2024/10/2024-10-17T140911Z_1346488079_RC2ESW9JSL4K_RTRMADP_3_ISRAEL-PALESTINIANS-SINWAR-1729204015.jpg?resize=1800%2C1800"
  return <div className={'sidebar-top'}>
    <div className="sidebar-top--user">
      <div className="sidebar-top--user-photo">
        <img
          src={profilePhoto}
          alt="Yahya Sinwar" />
      </div>
      <div className="sidebar-top--user-info">
        <h2 className="sidebar-top--user-name">{currentUser.name}</h2>
        <p className="sidebar-top--user-email">{currentUser.email}</p>
      </div>
    </div>
    <div className="sidebar-top--icons">
      <div className="sidebar-top--icons-item">
        <Funnel size={28} color="black"/>
      </div>
      <div className="sidebar-top--icons-item">
        <MagnifyingGlass size={28} color="black"/>
      </div>
    </div>
  </div>;
};

export default SideBarTop;
