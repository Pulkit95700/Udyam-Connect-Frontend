import React from "react";
import ProductBlockItem from "./ProductBlockItem";


const ProductBlockList = ({maxElements, products}) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">        
        <div className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8`}>
          {products.map((product) => (
            <ProductBlockItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBlockList;
