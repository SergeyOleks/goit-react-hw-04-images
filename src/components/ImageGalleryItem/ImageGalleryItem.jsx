import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export default function ImageGalleryItem ({ webformatURL, user }) {
    return <img src={webformatURL} alt={user} className={css.gallery__itemImage} />;
};


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  user: PropTypes.string,
};

