import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Notiflix from 'notiflix';
import AppCSS from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Error from './Error/Error';
import Blank from './Blank/Blank';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      imageResults: [],
      onSubmit: '',
      isLoading: false,
      page: 1,
      mounted: true,
      focusedImage: null,
      error: null,
      blank: false,
      errorMessage: 'Нажаль за вашим запитом результатів не було знайдено! Спробуйте інший запит'
    };
  }

  componentDidMount() {
    Notiflix.Notify.info('Застосунок запущено!');
  }

  handleSearchSubmit = async onSubmit => {
    this.setState(
      {
        imageResults: [],
        page: 1,
        onSubmit,
        isLoading: true,
      },
      async () => {
        try {
          const response = await axios.get(
            `https://pixabay.com/api/?q=${this.state.onSubmit}&page=1&key=35499078-ae1aac6b87ed3c45ca8fde2a7&image_type=photo&orientation=horizontal&per_page=12`
          );

          if (response.data.hits.length === 0) {
            this.setState({
              isLoading: false,
              error: true,
            });
            Notiflix.Notify.failure('Немає результатів!');
          } else if (this.state.onSubmit === '') {
            this.setState({ blank: true });
          } else {
            this.setState({
              imageResults: response.data.hits,
              error: false,
              blank: false,
            });
            Notiflix.Notify.success('Пошук виконано');
          }
        } catch (error) {
          this.setState({ error: true });
          console.log(this.state.error);
        }

        this.setState({ isLoading: false });
      }
    );
  };

  handleLoadMore = async prevState => {
    const { page } = this.state;
    const nextPage = page + 1;
    const response = await axios.get(
      `https://pixabay.com/api/?q=${this.state.onSubmit}&page=${nextPage}&key=35499078-ae1aac6b87ed3c45ca8fde2a7&image_type=photo&orientation=horizontal&per_page=12`
    );
    console.log(this.state.page);
    if (
      response.data.hits.length === 0 &&
      response.data.hits.length.length <= 12
    ) {
      this.setState({ isLoading: false });

      return;
    }
    if (this.state.imageResults !== prevState.imageResults) {
      this.setState(prevState => ({
        imageResults: [...prevState.imageResults, ...response.data.hits],
        page: nextPage,
      }));
      Notiflix.Notify.success('Завантажено додаткові результати за запитом!');
    }

    this.setState({ isLoading: false });
  };

  handleOpenModal = focusedImage => {
    this.setState({ focusedImage });
  };

  handleCloseModal = () => {
    this.setState({ focusedImage: null });
  };

  render() {
    const { imageResults } = this.state;
    const { isLoading } = this.state;
    const { focusedImage } = this.state;
    const { error } = this.state;
    const { onSubmit } = this.state;
    const { blank } = this.state;
    const isShowButton =
      imageResults.length > 0 &&
      !isLoading &&
      imageResults.length >= 12 &&
      imageResults.length % 12 === 0 &&
      blank === false;

    return (
      <div className={AppCSS.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {isLoading === true && <Loader isLoading={isLoading} />}
        {onSubmit === null || onSubmit === '' ? (
          <Blank />
        ) : (
          <ImageGallery
            imageResults={imageResults}
            onOpenModal={this.handleOpenModal}
          />
        )}
        {error === true && (
          <Error
            error={
              this.state.errorMessage
            }
          />
        )}
        {isShowButton && <Button onClick={this.handleLoadMore} />}
        {focusedImage && (
          <Modal
            largeImageURL={focusedImage.largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
App.propTypes = {
  imageResults: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
  onSubmity: PropTypes.string,
  isLoading: PropTypes.bool,
  selectedImage: PropTypes.object,
};
