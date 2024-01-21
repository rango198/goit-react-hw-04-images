import { useState } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { List } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import { ModalPicture } from 'components/Modal/Modal.styled';

export const ImagesGallery = ({ ListImages }) => {
  const [onModal, setOnModal] = useState(false);
  const [selectImage, setSelectImage] = useState({});

  const showModal = (largeImageURL, tags) => {
    setOnModal(true);
    setSelectImage({
      largeImageURL,
      tags,
    });
  };

  const closeModal = () => {
    setOnModal(false);
    setSelectImage({});
  };

  return (
    <>
      <List>
        {ListImages &&
          ListImages.map(image => (
            <ImageGalleryItem
              key={image.id}
              item={image}
              showModal={showModal}
            />
          ))}
      </List>

      {onModal && (
        <Modal close={closeModal}>
          <ModalPicture
            src={selectImage.largeImageURL}
            alt={selectImage.tags}
          />
        </Modal>
      )}
    </>
  );
};
