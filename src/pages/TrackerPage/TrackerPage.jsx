import s from './TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import { useState, useEffect } from 'react';
import { MODAL_NAME, TYPE } from '../../constants/index.js';
import Modal from '../../components/Modal/Modal.jsx';
import WaterModal from '../../components/WaterModal/WaterModal.jsx';
import { useDispatch } from 'react-redux';
import { getCurrentUserDataOperation } from '../../redux/user/operations.js';
import Loader from '../../components/Loader/Loader.jsx';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';

function TrackerPage() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCurrentUserData() {
      await dispatch(getCurrentUserDataOperation()).unwrap();
      setIsLoading(false);
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
      <Modal isOpen={isWaterModal.isOpen} onClose={closeWaterModal}>
        <WaterModal type={isWaterModal.type} onClose={closeWaterModal} />
      </Modal>
      <WaterDetailedInfo />
    </div>
  );
}

export default TrackerPage;
