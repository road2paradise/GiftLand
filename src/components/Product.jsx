import React from "react";
import ModalImage from "react-modal-image";

import "./css/Product.css";

const ProductImage = (props) => {
  const { key, smallImage, largeImage } = props;
  return (
    <ModalImage
      className="products-image"
      small={smallImage}
      large={largeImage}
      key={key}
    />
  );
};

export default ProductImage;