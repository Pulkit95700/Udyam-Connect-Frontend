import React, { useState, useEffect, useCallback } from "react";
import Input from "../ui/Input";
import Select from "react-select";
import { FileUploader } from "react-drag-drop-files";
import { privateGetMethod } from "../../requests/privateRequests/privateGetMethod";
import { privatePatchMethod } from "../../requests/privateRequests/privatePatchMethod";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
    setOpenResponse,
    setErrorStatus,
    setErrorValue,
} from "../../reducers/ResponseSlice";

const fileTypes = ["JPG", "PNG", "GIF"];

// const productCategories = [
//   { value: "electronics", label: "Electronics" },
//   {
//     value: "home and kitchen applicances",
//     label: "Home and Kitchen Appliances",
//   },
//   { value: "beauty and personal care", label: "Beauty and Personal Care" },
//   { value: "books and media", label: "Books and Media" },
//   {
//     value: "sports and outdoor equipment",
//     label: "Sports and Outdoor Equipment",
//   },
// ];

const EditProductModal = ({ product, onClose, handleActionState }) => {
    const [category, setCategory] = useState(product?.category?.id);
    const [image, setImage] = useState(product.image);
    const [imageChange, setImageChange] = useState(false);
    const [file, setFile] = useState(null);
    const [openImage, setOpenImage] = useState(true);
    const [name, setName] = useState(product?.name);
    const [description, setDescription] = useState(product?.description);
    const [price, setPrice] = useState(product?.price);
    const [length, setLength] = useState(product?.length);
    const [breadth, setBreadth] = useState(product?.breadth);
    const [height, setHeight] = useState(product?.height);
    const [weight, setWeight] = useState(product?.weight);
    const [units, setUnits] = useState(product?.units);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (file) => {
        setFile(file);
    };

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const dispatch = useDispatch();

    const imageCloseHandler = () => {
        setOpenImage(false);
        setImageChange(true);
        setImage(null);
    };

    const imageOpenHandler = () => {
        setOpenImage(true);
        setImageChange(false);
        setImage(product.image);
    };

    const getAllCategories = useCallback(() => {
        if (loading) return;
        setLoading(true);
        privateGetMethod(
            "products/categories/",
            {},
            (response) => {
                if (response.status >= 200 && response.status < 300) {
                    let cat = response?.data?.data?.map((category) => {
                        return { value: category?.id, label: category?.name };
                    });
                    setCategories(cat);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            },
            {
                "Content-Type": "multipart/formData",
                Accept: "application/json",
            }
        );
    }, [loading]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("weight", weight);
        formData.append("length", length);
        formData.append("breadth", breadth);
        formData.append("height", height);
        formData.append("units", units);
        formData.append("category", category.value);

        if (imageChange) formData.append("image", file);

        setLoading(true);
        privatePatchMethod(
            "products/myproducts/" + product.id,
            formData,
            (response) => {
                if (response?.status >= 200 && response?.status < 300) {
                    dispatch(setOpenResponse(true));
                    dispatch(setErrorStatus(false));
                    dispatch(setErrorValue("Product updated successfully"));

                    onClose();
                    handleActionState();
                    setTimeout(() => {
                        dispatch(setOpenResponse(false));
                    }, 3000);

                    setLoading(false);
                } else if (response.status === 400) {
                    dispatch(setOpenResponse(true));
                    dispatch(setErrorStatus(true));
                    dispatch(setErrorValue("Product could not be updated."));

                    setTimeout(() => {
                        handleActionState();
                        dispatch(setOpenResponse(false));
                        onClose();
                    }, 2000);
                    setLoading(false);
                }
            },
            {
                "Content-Type": "multipart/formData",
                Accept: "application/json",
            }
        );
    };

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    return (
        <>
            <div className="bg-white w-3/4 absolute min-h-[95vh] max-h-[100vh] rounded-md border-2 overflow-y-scroll border-blue-400 px-4 py-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <h3 className="text-xl">Edit Product</h3>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4"
                >
                    <Input
                        isLabel={true}
                        labelValue="Product Name"
                        inputPlaceholder="Enter Product Name"
                        required={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        isLabel={true}
                        labelValue="Description"
                        textarea={true}
                        inputPlaceholder="Enter Product Description"
                        required={true}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        isLabel={true}
                        labelValue="Price"
                        type="number"
                        inputPlaceholder="Price"
                        required={true}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input
                        isLabel={false}
                        inputPlaceholder="Units"
                        required={true}
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                    />
                    <div className="flex gap-4 items-center mt-4">
                        <label className="block mb-2 text-md font-medium text-gray-900">
                            Category:
                        </label>
                        <Select
                            className="w-72"
                            value={category}
                            onChange={handleCategoryChange}
                            options={categories}
                        />
                    </div>

                    <div className="flex gap-4 dimensions items-center mt-4">
                        <label className="block mb-2 text-md font-medium text-gray-900">
                            Dimensions:
                        </label>
                        <Input
                            isLabel={false}
                            inputPlaceholder="Length with units"
                            required={true}
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                        <Input
                            isLabel={false}
                            inputPlaceholder="Breadth with units"
                            required={true}
                            value={breadth}
                            onChange={(e) => setBreadth(e.target.value)}
                        />
                        <Input
                            isLabel={false}
                            inputPlaceholder="Height with units"
                            required={true}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <Input
                            isLabel={false}
                            inputPlaceholder="Weight with units"
                            required={true}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>

                    {!openImage ? (
                        <div className="flex w-full  gap-2 flex-col">
                            <div className="w-3/4">
                                <label className="block mb-2 text-md font-medium text-gray-900">
                                    Add Image
                                </label>
                                <FileUploader
                                    handleChange={handleFileChange}
                                    name="file"
                                    types={fileTypes}
                                />
                            </div>
                            <Button
                                variant="contained"
                                className="w-content h-10 w-48  "
                                type="button"
                                onClick={imageOpenHandler}
                            >
                                Previous Image
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="image__container flex gap-4 items-center mt-4">
                                <label className="block mb-2 text-md font-medium text-gray-900">
                                    Image:
                                </label>
                                <div className="image__container__image">
                                    <img
                                        src={`${image}`}
                                        className="w-64 h-64"
                                        alt="product"
                                    />
                                </div>
                                <CancelIcon
                                    onClick={imageCloseHandler}
                                    className="cursor-pointer"
                                />
                            </div>
                        </>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white w-1/4 py-2 rounded-md mt-4"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditProductModal;
