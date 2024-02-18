import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import AddProductModal from "../components/Products/AddProductModal";
import { Modal } from "@mui/material";
import ProductBlockList from "../components/Products/ProductBlockList";
import { privateGetMethod } from "../requests/privateRequests/privateGetMethod";
import Loading from "../components/ui/Loading";

const Products = () => {
    const [selectedCategories, setSelectedCategories] = useState("");
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoriesError, setCategoriesError] = useState(false);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const getAllProducts = useCallback(() => {
        privateGetMethod(
            `products/public?search=${search}&category=${selectedCategories}`,
            {},
            (response) => {
                if (response.status === 200) {
                    console.log(response?.data?.data);
                    setProducts(response?.data?.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }
        );
    }, [search, selectedCategories]);

    const myRef = React.createRef();

    const getAllCategories = useCallback(() => {
        setCategoriesError(false);
        if (loading) return;
        setLoading(true);
        privateGetMethod("products/categories/", {}, (response) => {
            if (response.status === 200) {
                setCategories(response?.data?.data);
                setCategoriesError(false);
                setLoading(false);
            } else {
                setCategoriesError(true);
                setLoading(false);
            }
        });
    }, [loading]);

    const selectedCategory = (e) => {
        if (e.target.checked) {
            setSelectedCategories(e.target.value);
        } else {
            setSelectedCategories(
                selectedCategories.filter(
                    (category) => category !== e.target.value
                )
            );
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    useEffect(() => {
        getAllProducts();
    }, [search, selectedCategories, getAllProducts]);

    return (
        <Layout>
            <div className="w-full h-full flex">
                <div className="w-3/4 h-[calc(100vh-4.6rem)] border border-b border-b-[#dbdbdb] py-4 flex flex-col justify-center px-14 border-r border-[#dbdbdb]">
                    <div
                        className="flex-1 overflow-y-scroll"
                        id="product-listing"
                    >
                        {loading ? (
                            <div className="flex justify-center">
                                <Loading />
                            </div>
                        ) : products.length > 0 ? (
                            <ProductBlockList products={products} />
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p>No items matchd</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-1/4 flex flex-col px-4 py-4 h-[calc(100vh-4.6rem)]">
                    <h1 className="text-3xl  mt-4">Filters</h1>
                    <div className="h-1/2 w-full flex flex-col mt-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Search by Name, Category "
                            />
                        </div>

                        <div className="mt-4 flex flex-col gap-6">
                            <h1 className="text-2xl">Categories</h1>
                            <div className="flex flex-col gap-2">
                                <div className="input__item items-center gap-1 flex">
                                    <input
                                        value={""}
                                        type="radio"
                                        onChange={(e) => selectedCategory(e)}
                                        name="category"
                                        id={"all"}
                                    />
                                    <label
                                        htmlFor={"category"}
                                        className="text-md"
                                    >
                                        All
                                    </label>
                                </div>
                                {categoriesError ? (
                                    <div className="text-red-500">
                                        Error loading categories
                                    </div>
                                ) : null}
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="input__item items-center flex gap-2"
                                    >
                                        <input
                                            value={category.id}
                                            type="radio"
                                            onChange={(e) =>
                                                selectedCategory(e)
                                            }
                                            name="category"
                                            id={category.id}
                                        />
                                        <label
                                            htmlFor={category.name}
                                            className="text-md"
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={openAddProductModal}
                onClose={() => setOpenAddProductModal(false)}
            >
                <AddProductModal
                    ref={myRef}
                    onClose={() => setOpenAddProductModal(false)}
                />
            </Modal>
        </Layout>
    );
};

export default Products;
