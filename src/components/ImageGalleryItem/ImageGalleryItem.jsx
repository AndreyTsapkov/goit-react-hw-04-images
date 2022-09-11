import { PropTypes } from 'prop-types';
import {
  ImageGalleryItemStyled,
  ImageGalleryImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, id, onClick }) => {
  return (
    <ImageGalleryItemStyled onClick={onClick} data-id={id}>
      <ImageGalleryImage src={webformatURL} alt={tags} />
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
