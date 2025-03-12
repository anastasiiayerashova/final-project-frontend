import s from './TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import { useState, useEffect } from 'react';
import { MODAL_NAME, TYPE } from '../../constants/index.js';
import Modal from '../../components/Modal/Modal.jsx';
import WaterModal from '../../components/WaterModal/WaterModal.jsx';
import { useDispatch } from 'react-redux';
import { getCurrentUserDataOperation } from '../../redux/user/operations.js';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';

function TrackerPage() {
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className={s.tracker_page}>
      <WaterMainInfo
        isWaterModal={isWaterModal}
        openWaterModal={openWaterModal}
      />
      <WaterDetailedInfo />
      <Modal isOpen={isWaterModal.isOpen} onClose={closeWaterModal}>
        <WaterModal type={isWaterModal.type} onClose={closeWaterModal} />
      </Modal>
    </div>
  );
}

export default TrackerPage;
