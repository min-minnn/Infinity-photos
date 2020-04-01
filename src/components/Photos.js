import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ImgBlock = styled.div`
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

function Photos(deps =[]) {
  const [photos, setPhotos] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhotos = async() => {
    try{
      setPhotos(null);
      setError(null);
      setLoading(true);

      const response = await axios.get(
        "https://api.unsplash.com/photos?page="+pageNumber+"&client_id=YUWTnOVlEviY4Y8uDNYkcDpbivf760DA3CmTjOZKXzw"
      );
      setPhotos(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
}

  useEffect(() => {
    fetchPhotos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  if(loading) return <div>loading</div>
  if(error) return <div>error</div>
  if(!photos) return null;

  return(
    <ImgBlock>
      {photos.map(photo => (
        <Img key={photo.id} src={photo.urls.small} />
      ))}
    </ImgBlock>
  )
}

export default Photos;