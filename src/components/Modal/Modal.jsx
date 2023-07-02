import css from './Modal.module.css';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, picture }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
