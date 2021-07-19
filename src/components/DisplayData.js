import React, { useState } from 'react';

const DisplayData = (props) => {
  return(
    <div>
      <h2>Hmmm... let me think about that</h2>
      <p>I found this: </p>
      <div className="result-container">
        <p className="result">{props.data}</p>
      </div>
    </div>
  );
}

export default DisplayData;
