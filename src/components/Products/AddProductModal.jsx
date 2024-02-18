import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Select from "react-select";
import { FileUploader } from "react-drag-drop-files";
import { privateGetMethod } from "../../requests/privateRequests/privateGetMethod";
import { privatePostMethod } from "../../requests/privateRequests/privatePostMethod";
import { useDispatch} from "react-redux";
import { setOpenResponse, setErrorStatus, setErrorValue } from "../../reducers/ResponseSlice";

const fileTypes = ["JPG", "PNG", "GIF"];

const AddProductModal = (props) => {
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [length, setLength] = useState(0);
  const [breadth, setBreadth] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [units, setUnits] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const handleFileChange = (file) => {
    setImage(file);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const getAllCategories = () => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = new File([image], image.name, { type: image.type });
    console.log(file);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("price", price);
    formData.append("weight", weight);
    formData.append("length", length);
    formData.append("breadth", breadth);
    formData.append("height", height);
    formData.append("units", units);
    formData.append("category", category.value);

    setLoading(true);
    privatePostMethod(
      "products/myproducts/",
      formData,
      (response) => {
        console.log(response);
        if (response?.status >= 200 && response?.status < 300) {
          dispatch(setOpenResponse(true));
          dispatch(setErrorStatus(false));
          dispatch(setErrorValue("Product created successfully"));

          setTimeout(() => {
            dispatch(setOpenResponse(false));
          }, 3000);

          setLoading(false);
          props.onClose();
          props.handleActionState();
        } else {
          console.log(response?.data);
          dispatch(setOpenResponse(true));
          dispatch(setErrorStatus(true));
          dispatch(setErrorValue("Product could not be created."));

          setTimeout(() => {
            dispatch(setOpenResponse(false));
          }, 3000);
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
  }, []);

  return (
    <>
      <div className="bg-white w-3/4 absolute min-h-[95vh] max-h-screen rounded-md border-2 overflow-y-scroll border-blue-400 px-4 py-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <h3 className="text-xl">Add Product</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
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
          <div>
            <label className="block mb-2 text-md font-medium text-gray-900">
              Add Image
            </label>
            <FileUploader
              handleChange={handleFileChange}
              name="file"
              types={fileTypes}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white w-1/4 py-2 rounded-md mt-4 w-full"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductModal;
