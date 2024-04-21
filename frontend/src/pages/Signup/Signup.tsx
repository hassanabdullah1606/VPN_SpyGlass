import './Signup.scss';
import Register from '../../components/Register/Register';

const Signup = () => {
  return (
    <div className="background">
      {/* <div className="navbar1">
        <div className="logo">
          <img className="logoDim" src="vpnlogo.svg" alt="" />
        </div>
        <div className="Register">
          <button type="submit">Register</button>
        </div>
      </div> */}
      <div>
        <Register />
      </div>
    </div>
  );
};

export default Signup;
