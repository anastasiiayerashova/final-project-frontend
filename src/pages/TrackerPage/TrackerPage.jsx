import s from './TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import { useState, useEffect } from 'react';
import { MODAL_NAME, TYPE } from '../../constants/index.js';
import Modal from '../../components/Modal/Modal.jsx';
import WaterModal from '../../components/WaterModal/WaterModal.jsx';
import { useDispatch } from 'react-redux';
import { getCurrentUserDataOperation } from '../../redux/user/operations.js';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal.jsx';
import LogOutModal from '../../components/LogOutModal/LogOutModal.jsx';
import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal.jsx';
import { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader.jsx';

function TrackerPage() {
  const [isLoading, setIsLoading] = useState(true);

  const [isSettingsModalOpen, setSettingsModal] = useState(false);
  const [isDeleteWaterModalOpen, setDeleteWaterModal] = useState(false);
  const [isLogoutModalOpen, setLogoutModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCurrentUserData() {
      try {
        await dispatch(getCurrentUserDataOperation()).unwrap();
        setIsLoading(false);
      } catch (e) {
        console.error(
          'Error in tracker page during getting current user data',
          e,
        );
      }
    }
    fetchCurrentUserData();
  }, [dispatch]);

  const [isWaterModal, setIsWaterModal] = useState({
    isOpen: false,
    type: null,
  });

  const openWaterModal = ({ isOpen, type }) => {
    setIsWaterModal({ isOpen: true, type });
  };

  const closeWaterModal = (isOpen) => {
    setIsWaterModal({ isOpen: false, type: null });
  };

  const closeDeleteWaterModal = (isOpen) => {
    setDeleteWaterModal(false);
  };

  const closeLogoutModal = (isOpen) => {
    setLogoutModal(false);
  };

  const closeSettingsModal = (isOpen) => {
    setSettingsModal(false);
  };

  return (
    <div>
      {isLoading ? (<Loader />) : (
        <div className={s.tracker_page}>
          <WaterMainInfo
            isWaterModal={isWaterModal}
            openWaterModal={openWaterModal}
          />
          <WaterDetailedInfo
            openWaterModal={openWaterModal}
            setLogoutModal={setLogoutModal}
            setDeleteWaterModal={setDeleteWaterModal}
            setSettingsModal={setSettingsModal}
          />
          <Modal isOpen={isWaterModal.isOpen} onClose={closeWaterModal}>
            <WaterModal type={isWaterModal.type} onClose={closeWaterModal} />
          </Modal>
          <Modal isOpen={isDeleteWaterModalOpen} onClose={closeDeleteWaterModal}>
            <DeleteWaterModal onClose={closeDeleteWaterModal} />
          </Modal>
          <Modal isOpen={isLogoutModalOpen} onClose={closeLogoutModal}>
            <LogOutModal onClose={closeLogoutModal} />
          </Modal>
          <Modal isOpen={isSettingsModalOpen} onClose={closeSettingsModal}>
            <UserSettingsModal onClose={closeSettingsModal} />
          </Modal>
          <Toaster position="top-right" />
        </div>
      )}
    </div>
  );
}

export default TrackerPage;
