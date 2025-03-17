import s from './TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import { useState, useEffect } from 'react';
import { MODAL_NAME, TYPE } from '../../constants/index.js';
import Modal from '../../components/Modal/Modal.jsx';
import WaterModal from '../../components/WaterModal/WaterModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserDataOperation } from '../../redux/user/operations.js';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal.jsx';
import LogOutModal from '../../components/LogOutModal/LogOutModal.jsx';
import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal.jsx';
import { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader.jsx';
import TourSteps from '../../reactour/TourSteps.jsx';
import { fetchWaterDaily } from '../../redux/water/operations.js';
import { updateDate } from '../../redux/water/slice.js';
import {
  selectDate,
  selectIsDaySelected,
} from '../../redux/water/selectors.js';

function TrackerPage() {
  const [isLoading, setIsLoading] = useState(true);

  const [isSettingsModalOpen, setSettingsModal] = useState(false);
  const [isDeleteWaterModalOpen, setDeleteWaterModal] = useState(false);
  const [isLogoutModalOpen, setLogoutModal] = useState(false);

  const reduxDate = useSelector(selectDate);
  const isDaySelected = useSelector(selectIsDaySelected);

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

  useEffect(() => {
    // Якщо користувач не вибирав дату з календаря
    if (!isDaySelected) {
      const checkDate = () => {
        const currentDate = new Date().toLocaleDateString('en-CA'); // Формат YYYY-MM-DD
        const storedDate = new Date(reduxDate).toLocaleDateString('en-CA');

        if (currentDate !== storedDate) {
          // Якщо настав новий день оновлюємо дату в стор та тягнемо нові дані за новий день
          dispatch(updateDate());
          dispatch(fetchWaterDaily(currentDate));
        }
      };

      checkDate(); // Перевіряємо дату під час завантаження компонента
      const interval = setInterval(checkDate, 60000); // Перевіряємо раз на хвилину
      return () => clearInterval(interval);
    }
  }, [dispatch, reduxDate, isDaySelected]);

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

  const [isTour, setIsTour] = useState(false)

  useEffect(() => {
    const tourFinished = localStorage.getItem('tourFinished')

    if (!tourFinished || tourFinished === 'false') {
      setIsTour(true)
    }
  }, [])

  const handleCloseTour = () => {
    localStorage.setItem('tourFinished', 'true')
    setIsTour(false)
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
          <div className={s.tracker_page}>
            {isTour ? (
              <TourSteps onFinish={handleCloseTour}>
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
               </TourSteps>
            ) :
              (
                <>
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
           </>   )
          }

          <Modal isOpen={isWaterModal.isOpen} onClose={closeWaterModal}>
            <WaterModal type={isWaterModal.type} onClose={closeWaterModal} />
          </Modal>
          <Modal
            isOpen={isDeleteWaterModalOpen}
            onClose={closeDeleteWaterModal}
          >
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
