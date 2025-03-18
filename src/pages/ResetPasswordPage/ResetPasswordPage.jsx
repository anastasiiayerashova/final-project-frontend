import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm.jsx';
import s from './ResetPasswordPage.module.css';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal.jsx';
import ResetPasswordModal from '../../components/ResetPasswordModal/ResetPasswordModal.jsx';

const ResetPasswordPage = () => {
  // после клика на reset password попадаем сюда
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const openResetPasswordModal = () => {
    setIsResetPasswordModalOpen(true);
  };

  const closeResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
  };

  return (
    <div className={s.main_wrapper}>
      <div>
        <ResetPasswordForm onEmailSent={openResetPasswordModal} />
      </div>
      <div className={s.advantages_wrapper}>
        <AdvantagesSection />
      </div>
      {isResetPasswordModalOpen && (
        <Modal isOpen={isResetPasswordModalOpen} onClose={closeResetPasswordModal}>
          <ResetPasswordModal onClose={closeResetPasswordModal} />
        </Modal>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default ResetPasswordPage;
