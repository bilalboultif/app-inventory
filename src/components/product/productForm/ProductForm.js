import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

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

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,

}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
                <img
                  src={product ? product.image : productImage}
                  alt="product"
                />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <select
  name="category"
  value={product?.category}
  onChange={handleInputChange}
>
  <option value="">Select a category</option>
  {categoryOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>

          <label>Product Serial:</label>
          <input
            type="text"
            placeholder="Product serial"
            name="serial"
            value={product?.serial}
            onChange={handleInputChange}
          />

          <label>Product Asset:</label>
          <input
            type="text"
            placeholder="Product asset"
            name="asset"
            value={product?.asset}
            onChange={handleInputChange}
          />

          <label>Product Location:</label>
          <select
            name="location"
            value={product?.location}
            onChange={handleInputChange}
          >
            {locationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;