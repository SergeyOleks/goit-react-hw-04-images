import { fetchFindResult } from './fetchFindResult';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';

import css from './Searchbar.module.css';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

const Searchbar = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [page, setPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalPic, setModalPic] = useState(false);
  const [pageFlag, setPageFlag] = useState(true);

  const toggleModal = event => {
    if (event) {
      const { src } = event.target;   

      const findObject = data.hits.find(el => el.webformatURL === src);
      setModalPic(findObject);
      }
    setShowModal(state => !state );
  };

  
  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);

    if (name.trim() === '') {
      setPageFlag(false);
      setLoading(false);
      return;
    }

    const { data } = await fetchFindResult(name, page);
  
    if (!data || data['hits'].length === 0) {
      setData(false);
      setLoading(false);
      setPageFlag(false);
      return;
    }

    if (data.totalHits <= 12) {
      setPageFlag(false);
    }

    setTimeout(() => {
      setLoading(false);
      setData(data)
    }, 1000);
  };

  const handlePageIncreace = async () => {

    setPage(state => state + 1);

    const { data } = await fetchFindResult(name, page);
    
    data.hits = data.hits.concat(data.hits);
    setData(data)

    if (page * 12 >= data.totalHits) {
      setPageFlag(false);
    }
    setLoading(false);
  };

  const handleNameChange = event => {
    setName(event.currentTarget.value.toLowerCase());
  };


  return (
    <>
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchForm__button}>
            <FaSearch />
          </button>

          <input
            className={css.searchForm__input}
            type="text"
            value={name}
            onChange={handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      {loading && <Loader />}
      <ImageGallery data={data.hits} onClick={toggleModal} />
      {data && pageFlag && <Button onClick={handlePageIncreace} />}
      {showModal && <Modal onClose={toggleModal} picture={modalPic} />}
    </>
  );
};

export default Searchbar;

