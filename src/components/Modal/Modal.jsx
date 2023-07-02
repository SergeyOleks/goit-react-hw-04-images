import css from './Modal.module.css';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, picture }) {

  useEffect(() => {
    window.addEventListener('keydown', (e) => { if (e.code === 'Escape') { onClose(e) } })

    return (() => {
      window.removeEventListener('keydown', (e) => { if (e.code === 'Escape') { onClose(e) } })
    })
  },[onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        {picture && <img src={picture.largeImageURL} alt={picture.tags} />}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  picture: PropTypes.object,
};
