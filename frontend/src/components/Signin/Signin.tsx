import './Signin.scss';
import { FaUser, FaLock } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [submitButtonDisabled, setsubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    // event.preventDefault(); // Prevent the form from submitting

    if (!values.email || !values.password) {
      setErrorMsg('Fill all fields');
      return;
    }

    setErrorMsg('');

    setsubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async () => {
        setsubmitButtonDisabled(false);

        navigate('/');
        // console.log(user);
      })
      .catch((err) => {
        setsubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div>
      <div className="credentials-navbar">
        <div className="logo">
          <img className="logoDim" src="vpnlogo1.svg" alt="" />
        </div>
      </div>
      <div className="container">
        <div className="paragraph">
          <h2>VPN SPYGLASS</h2>
          <p>
            Protect your network with confidence and ease by registering with
            us. Our comprehensive security solutions ensure your data stays safe
            from threats. Join us today and take the first step towards a secure
            digital environment.
          </p>
        </div>
        <div className="wrapper">
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <a href="#">Forgot Password?</a>
            </div>
            <b className="error">{errorMsg}</b>
            <button
              disabled={submitButtonDisabled}
              onClick={handleSubmission}
              type="submit"
            >
              Login
            </button>
            <div className="register-link">
              <p>
                Don't have an account?
                <a href="/Signup">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
