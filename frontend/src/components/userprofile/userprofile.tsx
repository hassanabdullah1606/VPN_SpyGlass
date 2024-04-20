import './userprofile.scss';
import { FaCamera } from 'react-icons/fa';

const UserProfile = () => {
  return (
    <div className="userProfile">
      <div className="column1">
        <h2>My Profile</h2>
        <div className="user">
          <div className="input-box">
            <FaCamera className="icon" />
            <p>Add a profile photo</p>
          </div>
        </div>
      </div>
      <div className="name-box">
        <div className="firstname">
          <label htmlFor="">First Name</label>
          <input className="input" type="email" required />
        </div>
        <div className="lastname">
          <label htmlFor="">last Name</label>
          <input className="input" type="text" />
        </div>
      </div>
      <div className="necessaryInfo">
        <div className="info">
          <label htmlFor="">Email</label>

          <input className="input" type="text" />
        </div>
        <div className="info">
          <label htmlFor="">Phone Number</label>
          <input className="input" type="tel" />
        </div>
        <p className="message">
          Please reach out to your friendly community to change your name and
          email
        </p>
        <div className="info">
          <label htmlFor="">Current Password*</label>
          <input className="input" type="password" required />
        </div>
        <div className="info">
          <label htmlFor="">New Password*</label>
          <input className="input" type="password" required />
        </div>
        <div className="info">
          <label htmlFor="">Confirm Password*</label>
          <input className="input" type="password" required />
        </div>
      </div>
      <button className="submit" type="submit">
        Submit
      </button>
    </div>
  );
};

export default UserProfile;
