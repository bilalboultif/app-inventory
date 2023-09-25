import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

const initialState = {
  name: "",
  category: "", // Add category field
  quantity: "",
  serial: "",
  asset: "",
  location: "", // Add location field
};

const AddProduct = () => {
  const categoryOptions = [
    "hp printer",
    "slam printer",
    "asin printer",
    "pslip printer",
    "gw printer",
    "laptop",
    "RF scanner",
    "tote scanner",
    "bluetooth scanner",
    "honywell scanner",
    "thin client",
    "TC5x",
    "Cage"
  ];
  
  const locationOptions = [
    "HR",
    "Safety",
    "AMcare",
    "Learning",
    "Security",
    "Pick west",
    "Pick east",
    "stow west",
    "stow east",
    "AFE",
    "singles",
    "multis",
    "icqa",
    "ISS",
    "non-inventory",
    "ship dok",
    "receive",
    "Cage"
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, serial, asset, location, quantity } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("serial", serial);
    formData.append("asset", asset);
    formData.append("location", location); // Add location to the form data
    formData.append("description", description);
    formData.append("image", productImage);

    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
  product={product}
  productImage={productImage}
  imagePreview={imagePreview}
  description={description}
  setDescription={setDescription}
  handleInputChange={handleInputChange}
  handleImageChange={handleImageChange}
  saveProduct={saveProduct}
  categoryOptions={categoryOptions}
  locationOptions={locationOptions}  // Pass categoryOptions as a prop
/>
    </div>
  );
};

export default AddProduct;
