import { Component } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  findImage = () => {
    const { images, id } = this.props;
    if (id) {
      return images.find(image => image.id === id);
    }
  };

  render() {
    const foundImage = this.findImage();
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <img src={foundImage.largeImageURL} alt={foundImage.tags} />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  images: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
