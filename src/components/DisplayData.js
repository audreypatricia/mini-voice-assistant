import React from 'react';

const DisplayData = (props) => {
  return(
    <div>
      <p>I found this: </p>
      <div className="result-container">
        <p className="result">{props.data}</p>
      </div>
    </div>
  );
}

export default DisplayData;
