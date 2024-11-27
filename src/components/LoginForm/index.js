import './index.css';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputFeild from '../UI/input';
import Wrapper from '../Wrapper/auth';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const OnSubmit = async e => {
    e.preventDefault();

    const userDetails = {
      username: userName,
      password: userPassword,
    };
    console.log(userDetails);
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch('https://apis.ccbp.in/login', options);
      const data = await response.json();
      if (response.ok) {
        const jwtToken = data.jwt_token;
        console.log('Login: ', jwtToken);
        Cookies.set('jwt_token', jwtToken, { expires: 20 });
        navigate('/'); // Navigate to home
      } else {
        setErrorMsg(data.error_msg || 'Invalid login credentials');
      }
    } catch (error) {
      setErrorMsg('Something went wrong');
      console.log(error);
    }
  };

  return (
    <Wrapper title="Login">
      <form className="form-container" onSubmit={OnSubmit}>
        <InputFeild
          type="text"
          id="username"
          labelText="USERNAME"
          name="username"
          onChange={e => setUserName(e.target.value)}
        />
        <InputFeild
          type="password"
          id="password"
          labelText="PASSWORD"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </form>
    </Wrapper>
  );
};

export default LoginForm;
