import ReactModal from 'react-modal';
import css from './Modal.module.css';

export default function Modal({ isOpen, onClose, children, setState }) {
  return (
    <ReactModal
      overlayClassName={css.backdrop}
      isOpen={isOpen}
      className={css.modal}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={onClose}
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
    >
      <button className={css.closeBtn} onClick={onClose}>
        <svg className={css.iconX}>
          <use href="/sprite.svg#x"></use>
        </svg>
      </button>
      {children}
    </ReactModal>
  );
}
