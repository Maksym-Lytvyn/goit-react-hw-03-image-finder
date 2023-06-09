import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ImageGalleryCSS from './ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    const { imageResults, onOpenModal } = this.props;

    return (
      <>
        <ul className={ImageGalleryCSS.ImageGallery}>
          {imageResults.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onOpenModal={onOpenModal}
            />
          ))}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  imagesResults: PropTypes.arrayOf(PropTypes.object),
  onOpenModal: PropTypes.func.isRequired,
};
export default ImageGallery;
