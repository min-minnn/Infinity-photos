import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ImgBlock = styled.div`
  height: 100%;
  overflow: auto;
  img{
    &:hover {
      filter: brightness(50%);
    }
  }
`;

const Img = styled.img`
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMorePhotos = () => {
    setTimeout(() => {
      setLoading(true);
      try {
        axios.get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: 'XjG_79dJXuU7Zx5TRHZBBmSTuqTdcAs_LtyesusCJNU',
            count: 30
          }
        })
        .then((response) => {
          setPhotos(photos.concat(response.data));
        }); 
      } catch (e) {
        setError(e);
      }
    setLoading(false);
    }, 2000)
  };

  useEffect(() => {
    fetchMorePhotos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos])

  if(loading) return <h4>loading...</h4>;
  if(error) return <h4>error</h4>

  return(
    <ImgBlock>
      {photos.map(photo => (
        <Img key={photo.id} src={photo.urls.small} />
      ))}
    </ImgBlock>
  )
}

export default Photos;