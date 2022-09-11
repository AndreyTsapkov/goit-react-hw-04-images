import { Component } from 'react';
import { fetchImages } from 'services/images-api';
import { AppContainer } from './App.styled';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import ErrorImage from '../images/error.jpg';
import { ImageGallery } from './ImageGallery';
import { LoadMore } from './Button';
import { Modal } from './Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    idImage: null,
    page: 1,
    per_page: 12,
    isLoading: false,
    loadMore: false,
    showModal: false,
    isEmpty: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages(searchQuery, page);
    }
  }

  getImages = async (query, page) => {
    if (!query) return;

    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await fetchImages(query, page);

      const isLoadMore =
        this.state.page < Math.round(totalHits / this.state.per_page);

      if (hits.length === 0) {
        this.setState({ isEmpty: true });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: isLoadMore,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleShowModal = event => {
    this.setState({ showModal: true, idImage: event.currentTarget.dataset.id });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleChangeSearchQuery = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      loadMore: false,
      images: [],
      isEmpty: false,
    });
  };
  render() {
    const {
      page,
      loadMore,
      showModal,
      images,
      idImage,
      isLoading,
      isEmpty,
      error,
    } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleChangeSearchQuery} />

        {isLoading && <Loader />}
        {isEmpty && (
          <div>
            <p>No images found for your request</p>
            <img src={ErrorImage} alt={error} />
          </div>
        )}

        {console.log(images)}

        <ImageGallery showModal={this.handleShowModal} images={images} />

        {loadMore && <LoadMore onClick={this.loadMore} page={page} />}

        {showModal && (
          <Modal
            images={images}
            id={Number(idImage)}
            onClose={this.handleCloseModal}
          />
        )}
      </AppContainer>
    );
  }
}
