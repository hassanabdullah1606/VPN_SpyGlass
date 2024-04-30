import './navbar.scss';
import { Link } from 'react-router-dom';
// import Notifications from '../notifications/notifications';
import { auth } from '../../../firebase';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // setUserName(user.displayName);
          console.log(user.displayName);
        } else setUserName('');
      });
      console.log(user);
    });
  });

  return (
    <div className="navbar">
      <div className="icons">
        <div className="notifications">
          <img src="notifications.svg" alt="" />
          <span></span>
        </div>
        <div className="user">
          <span>{userName}</span>
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
