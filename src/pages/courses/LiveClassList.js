import React from 'react';
import { useParams } from 'react-router-dom';

const LiveClassList = () => {
  const { id } = useParams();

  return (
    <div>
      LiveClassList
      <p>ID: {id}</p>
    </div>
  );
};

export default LiveClassList;
