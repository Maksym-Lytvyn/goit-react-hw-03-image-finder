import ImageGalleryCSS from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(image);
  };

  return (
    <li className={ImageGalleryCSS.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.alt}
        className={ImageGalleryCSS.ImageGalleryItem - image}
        onClick={handleClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
