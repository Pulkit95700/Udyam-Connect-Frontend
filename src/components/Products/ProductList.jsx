import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products, handleActionState }) => {

  return (
    <div className="product-list flex flex-col w-full gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} handleActionState={handleActionState} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
