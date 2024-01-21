import { useEffect, useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImagesGallery } from './ImageGallery/ImageGallery';
import * as API from 'components/services/api';
import { BtnWrapper } from 'components/Button/Button.styled';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [textSearch, setTextSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!textSearch) return;
      setIsLoading(true);

      try {
        const result = await API.getAllImages(textSearch, page);
        setImages(prevImages => {
          return page === 1 ? result.hits : [...prevImages, ...result.hits];
        });

        setTotalPages(Math.floor(result.totalHits / 12));
      } catch (error) {
        setError('An error occurred while fetching images.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, textSearch]);

  const LoadMore = () => {
    setPage(prev => prev + 1);
  };

  const addtextSearch = value => {
    const { search } = value;
    const formatText = search.trim().toLowerCase().split(' ').join('+');
    setTextSearch(formatText);
    setPage(1);
  };

  return (
    <div>
      {error && <h2>{error.message}</h2>}
      {isLoading && <Loader />}
      <SearchBar onSubmit={addtextSearch} />
      <ImagesGallery ListImages={images} />
      {textSearch.length > 0 && images.length === 0 && (
        <div>
          <p>{`Oops... there are no images matching your search... `}</p>
        </div>
      )}
      {images.length > 0 && page <= totalPages && (
        <BtnWrapper>
          <Button onClick={LoadMore} type="button">
            Load more
          </Button>
        </BtnWrapper>
      )}
    </div>
  );
};
