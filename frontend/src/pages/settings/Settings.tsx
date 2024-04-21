import Menu from '../../components/menu/menu';
import Navbar from '../../components/navbar/navbar';
import '../../styles/global.scss';
import './Settings.scss';
import UserProfile from '../../components/userprofile/userprofile';

const Settings = () => {
  return (
    <div className="container">
      <div className="menuContainer">
        <Menu />
      </div>
      <div className="bodyContainer">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="contentContainer">
          <div className="settings">
            <div className="box">
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
