import { PropTypes } from 'prop-types';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ images, showModal }) => {
  return (
    <ImageGalleryStyled>
      {images.length > 0 &&
        images.map(({ webformatURL, tags, id }) => {
          return (
            <ImageGalleryItem
              onClick={showModal}
              webformatURL={webformatURL}
              tags={tags}
              id={id}
              key={id}
            />
          );
        })}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};
