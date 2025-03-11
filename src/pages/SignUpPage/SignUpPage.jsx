import React from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import s from './SignUpPage.module.css';
import { Toaster } from 'react-hot-toast';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';

const SignUpPage = () => {
  return (
    <div className={s.main_wrapper}>
      <div>
        <SignUpForm />
      </div>
      <div className={s.advantages_wrapper}>
        <AdvantagesSection/>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default SignUpPage;
