import { useState, useEffect } from 'react';
import { fetchImages } from 'services/images-api';
import { AppContainer } from './App.styled';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import ErrorImage from '../images/error.jpg';
import { ImageGallery } from './ImageGallery';
import { LoadMore } from './Button';
import { Modal } from './Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [idImage, setIdImage] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const PER_PAGE = 12;

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (query, page) => {
    if (!query) return;

    setIsLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(query, page);

      if (hits.length === 0) {
        setIsEmpty(true);
      }

      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.round(totalHits / PER_PAGE));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeSearchQuery = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setLoadMore(false);
    setImages([]);
    setIsEmpty(false);
  };

  const handleShowModal = event => {
    setShowModal(true);
    setIdImage(event.currentTarget.dataset.id);
    this.setState({ showModal: true, idImage: event.currentTarget.dataset.id });
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleChangeSearchQuery} />

      {isLoading && <Loader />}
      {isEmpty && (
        <div
          style={{
            margin: '0 auto',
          }}
        >
          <p
            style={{
              textAlign: 'center',
              fontSize: '24px',
              marginBottom: '20px',
            }}
          >
            No images found for your request
          </p>
          <img src={ErrorImage} alt={error} />
        </div>
      )}

      {searchQuery && (
        <ImageGallery showModal={handleShowModal} images={images} />
      )}

      {loadMore && (
        <LoadMore
          onClick={() => {
            setPage(page => page + 1);
          }}
          page={page}
        />
      )}

      {showModal && (
        <Modal
          images={images}
          id={Number(idImage)}
          onClose={() => setShowModal(false)}
        />
      )}
    </AppContainer>
  );
};
