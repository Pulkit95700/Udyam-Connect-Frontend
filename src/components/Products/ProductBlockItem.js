import React from "react";
import { useNavigate } from "react-router-dom";

const ProductBlockItem = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div key={product.id} className="group relative cursor-pointer">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    alt="product"
                    src={`${product.image}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <p onClick={() => navigate("/product/" + product.id)}>
                            <span
                                aria-hidden="true"
                                className="absolute inset-0"
                            />
                            {product.name}
                        </p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                    </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                    {product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductBlockItem;
