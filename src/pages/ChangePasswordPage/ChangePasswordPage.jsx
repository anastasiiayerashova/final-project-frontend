import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm';
import s from './ChangePasswordPage.module.css';

const ChangePasswordPage = () => {
  return (
    <div className={s.main_wrapper}>
      <ChangePasswordForm />
      <div className={s.advantages_wrapper}>
        <AdvantagesSection/>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
