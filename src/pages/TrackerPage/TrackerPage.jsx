import s from './TrackerPage.module.css'
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx"
import { useState } from 'react'
import { MODAL_NAME, TYPE } from "../../constants/index.js"
import Modal from '../../components/Modal/Modal.jsx'
import WaterModal from '../../components/WaterModal/WaterModal.jsx'

function TrackerPage() {

  const [isWaterModal, setIsWaterModal] = useState({
    isOpen: false,
    type: null
  })

  const openWaterModal = ({isOpen, type}) => {
    setIsWaterModal({isOpen: true, type})
  }

  const closeWaterModal = (isOpen) => {
    setIsWaterModal({isOpen: false, type: null})
  }
    return (
       <div className={s.tracker_page}>
          <WaterMainInfo isWaterModal={isWaterModal} openWaterModal={openWaterModal} />
            <Modal isOpen={isWaterModal.isOpen} onClose={closeWaterModal}>
              <WaterModal type={isWaterModal.type } onClose={closeWaterModal} />
            </Modal>
       </div>
    )
}

export default TrackerPage;
