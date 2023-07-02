import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { nanoid } from 'nanoid';

export default function ImageGallery ({ data, onClick }) {
  return (
    data && (
      <ul className={css.imageGallery}>
        {data.map(({ webformatURL, user }) => {
          const id = nanoid();
          return (
            <li key={id} className={css.gallery__item} onClick={onClick}>
              <ImageGalleryItem webformatURL={webformatURL} user={user} />
            </li>
          );
        })}
      </ul>
    )
  );
};


