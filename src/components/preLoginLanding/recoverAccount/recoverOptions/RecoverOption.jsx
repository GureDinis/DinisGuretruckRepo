import React from 'react';
import PropTypes from 'prop-types';

function RecoverOption({ image, title, style, onClick }) {
  return (
    <div className={`${style} `} onClick={onClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}

RecoverOption.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default RecoverOption;
