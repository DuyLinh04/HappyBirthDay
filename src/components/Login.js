import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const CLIENT_ID = '172797547297-5eh4mn8vljf0ig9s2u7r2d21q42pdqmn.apps.googleusercontent.com';  // Thay bằng Google Client ID của bạn

const Login = () => {
  const navigate = useNavigate();

  // Sử dụng useCallback để ngăn hàm handleCredentialResponse thay đổi mỗi lần render
  const handleCredentialResponse = useCallback((response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    navigate('/greeting'); // Chuyển hướng sau khi đăng nhập thành công
  }, [navigate]); // Thêm navigate vào dependency array

  useEffect(() => {
    /* Initialize Google Identity Services */
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
    });

    /* Render the Google Sign-In button */
    window.google.accounts.id.renderButton(
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large' }
    );
  }, [handleCredentialResponse]); // Đưa handleCredentialResponse vào dependency array

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome! Please sign in</h2>
        <div id="google-button"></div>
        <div className="pixel-cat">
          <img src="/cat.png" alt="Pixel Cat" className="cat" />
        </div>
      </div>
      <div className="star-background"></div>
    </div>
  );
};

export default Login;
