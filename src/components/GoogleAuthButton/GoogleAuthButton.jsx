import { FcGoogle } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import s from './GoogleAuthButton.module.css';
import { api } from '../../utils/axios.config.js';
import { useNavigate, NavLink } from 'react-router-dom';

const getUrl = async () => await api.get('/auth/get-oauth-url');

const GoogleAuthButton = ({ text }) => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const {
        data: { data },
      } = await getUrl();
      console.log('🔍 Google OAuth URL:', data.url);
      setUrl(data.url);
    }
    getData();
  }, []);

  const googleSignIn = async (token) => {
    try {
      const { data } = await api.post('/auth/confirm-oauth', { token });
      localStorage.setItem('token', data.token);
      navigate('/tracker');
    } catch (e) {
      console.log('Google sign in error', e);
    }
  };

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.data.type === 'GOOGLE_AUTH_SUCCESS') googleSignIn(e.data.token);
    });

    return () => {
      window.removeEventListener('message', googleSignIn);
    };
  }, []);

  return (
    <NavLink to={url} className={s.button}>
      {text} <FcGoogle size={15} />
    </NavLink>
  );
};

export default GoogleAuthButton;
