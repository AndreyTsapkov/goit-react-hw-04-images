import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, images, id }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const findImage = () => {
    if (id) {
      return images.find(image => image.id === id);
    }
  };

  const foundImage = findImage();

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={foundImage.largeImageURL} alt={foundImage.tags} />
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  images: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
