import React from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import s from './SignInPage.module.css'

const SignInPage = () => {
  return (
    <div className={s.main_wrapper}>
      <div>
        <SignInForm />
      </div>
      <div className={s.advantages_wrapper}>
        <AdvantagesSection/>
      </div>
    </div>
      
    
  );
};

export default SignInPage;
