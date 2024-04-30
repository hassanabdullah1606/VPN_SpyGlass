import { useState } from 'react';
import './Register.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../../backend/firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [submitButtonDisabled, setsubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    // event.preventDefault(); // Prevent the form from submitting

    if (
      !values.username ||
      !values.email ||
      !values.password ||
      !values.confirmpassword
    ) {
      setErrorMsg('Fill all fields');
      return;
    }

    if (values.password !== values.confirmpassword) {
      setErrorMsg('Password and Confirm password are not the same');
      return;
    }

    setErrorMsg('');

    setsubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setsubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.username,
        });
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
          <form onSubmit={handleSubmission}>
            <h1>Create Account</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
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
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    confirmpassword: event.target.value,
                  }))
                }
              />
            </div>
            <b className="error">{errorMsg}</b>
            <button
              onClick={handleSubmission}
              type="submit"
              disabled={submitButtonDisabled}
            >
              Sign Up
            </button>
            <div className="register-link">
              <p>
                Have an account? <a href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
