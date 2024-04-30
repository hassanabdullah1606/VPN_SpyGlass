import './navbar.scss';
import { Link } from 'react-router-dom';
// import Notifications from '../notifications/notifications';
import '../../../../backend/firebase';
// import { useState } from 'react';


const Navbar = () => {
  // const [userName] = useState('');

 

  return (
    <div className="navbar">
      <div className="icons">
        <div className="notifications">
          <img src="notifications.svg" alt="" />
          <span></span>
        </div>
        <div className="user">
          <span>"ALI"</span>
          <Link to="/settings">
            <img
              src="https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
