import React from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import s from './SignUpPage.module.css';
import { Toaster } from 'react-hot-toast';

const SignUpPage = () => {
  return (
    <div className={s.main_wrapper}>
      <div>
        <SignUpForm />
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default SignUpPage;
