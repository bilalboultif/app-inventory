import React, { useEffect, useState } from "react";
import "./ProductSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import { SpinnerImg } from "../../loader/Loader";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_LOCATION,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectLocation,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// Function to calculate the total quantity of a specific product name
const calculateTotalQuantityByName = (productName, products) => {
  let totalQuantity = 0;

  products.forEach((product) => {
    if (product.name === productName) {
      totalQuantity += parseInt(product.quantity, 10)
    }
  });

  return totalQuantity;
};
const ProductSummary = ({ products, locationOptions }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);

  const location = useSelector(selectLocation);
  const [showLocation, setShowLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showEmptyLocation, setShowEmptyLocation] = useState(false);

const [showProductNamesAndQuantities, setShowProductNamesAndQuantities] = useState(false);
const [productNamesAndQuantities, setProductNamesAndQuantities] = useState({});

  const [showFivePercentProductCounts, setShowFivePercentProductCounts] = useState(false);

  const toggleCategories = () => {
    setShowLocation(!showLocation);
   
  };

  const toggleEmptyCategories = () => {
    setShowEmptyLocation(!showEmptyLocation);
   
  };

 

  // Toggle visibility of 5% product counts
  const toggleFivePercentProductCounts = () => {
    setShowFivePercentProductCounts(!showFivePercentProductCounts);
  };

  
    // Function to calculate products that are under 5% in the "Cage" location
    const calculateProductsUnderFivePercentInCage = () => {
      // Step 1: Calculate total quantities of each product name across all locations
      const productQuantities = {};
      products.forEach((product) => {
        const productName = product.name;
        const quantity = product.quantity;
        if (!productQuantities[productName]) {
          productQuantities[productName] = 0;
        }
        productQuantities[productName] += quantity;
        
      });
  
    // Step 2: Calculate the total quantity of all products in all locations
const totalQuantity = products.reduce((total, product) => {
  return total + parseInt(product.quantity, 10);
}, 0);
 
      // Step 3: Calculate the 5% threshold based on the total quantity
      const fivePercentThreshold = (totalQuantity * 5) / 100;

      // Step 4: Determine which product names in the "Cage" location have quantities under the 5% threshold
      const cageProducts = products.filter(
        (product) => product.location === "Cage"
      );

   // Filter product names under 5% in the "Cage" location
const productsUnderFivePercent = cageProducts.filter((product) => {
  const productName = product.name;
  const quantity = product.quantity;

  // Check if the quantity is less than or equal to 5% of the total quantity or if it's 0
  const isUnderFivePercent = (quantity / productQuantities[productName]) * 100 <= fivePercentThreshold || quantity === 0;

  console.log(`Product: ${productName}, Quantity: ${quantity}, Under 5%: ${isUnderFivePercent}`);

  return isUnderFivePercent;
});





// Now you can access each product's name and quantity in productsUnderFivePercent
productsUnderFivePercent.forEach((product) => {
  const productName = product.name;
  const quantity = product.quantity;

  console.log("name " + productName);
  console.log("quantity " + quantity);
});
  
      return productsUnderFivePercent;
    };

const productsUnderFivePercentInCage = calculateProductsUnderFivePercentInCage();

  





  // Calculate the count of products in each location
  const locationCounts = locationOptions.map((locationOption) => ({
    name: locationOption,
    count: products.filter((product) => product.location === locationOption)
      .length,
  }));


  const emptyLocationCount = locationOptions.filter((location) => {
    return !products.some((product) => product.location === location);
  }).length;


  const filterProductsByLocation = (locationOption) => {
    setSelectedLocation(locationOption); // Set the selected location
    setShowEmptyLocation(!showEmptyLocation);
  };

  const unfilterProductsByLocation = (locationOption) => {
    setSelectedLocation(!locationOption); // Set the selected location
  };
  // Filter products based on the selected location
  const filteredProducts = selectedLocation
    ? products.filter((product) => product.location === selectedLocation)
    : products;
    const shortenText = (text, n) => {
      if (text.length > n) {
        const shortenedText = text.substring(0, n).concat("...");
        return shortenedText;
      }
      return text;
    };
  

  //count product name
  const countUniqueProductNames = (products) => {
    const uniqueProductNames = [...new Set(products.map((product) => product.name))];
    return uniqueProductNames.length;
  };

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK({ products, locationOptions }));
    dispatch(CALC_LOCATION(products));
  }, [dispatch, products]);
  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 50;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination
// count products for all name
  const calculateProductNamesAndQuantities = (products) => {
    const productNamesAndQuantities = {};
  
    products.forEach((product) => {
      const productName = product.name;
      const quantity = product.quantity;
  
      if (!productNamesAndQuantities[productName]) {
        productNamesAndQuantities[productName] = 0;
      }
  
      productNamesAndQuantities[productName] += quantity;
    });
  
    return productNamesAndQuantities;
  };
  
  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={countUniqueProductNames(products)}
          bgColor="card1"
        />
        <InfoBox
          icon={categoryIcon}
          title={"Total Devices"}
          count={`${formatNumbers(totalStoreValue.toFixed(0))}  `}
          bgColor="card2"
        />
    <div onClick={toggleFivePercentProductCounts}>
        <InfoBox
          icon={outOfStockIcon}
          title={"5% Locations"}
          count={productsUnderFivePercentInCage.length}
          bgColor="card3"
        />
      </div>

        <div onClick={toggleEmptyCategories}>
          <InfoBox
            icon={outOfStockIcon}
            title={"Empty Locations"}
            count={emptyLocationCount}
            bgColor="card1"
          />
        </div>

        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={location.length}
          bgColor="card4"
        />
        <div onClick={toggleCategories}>
          <InfoBox
            icon={categoryIcon}
            title={"All Locations"}
            count={locationCounts.length}
            bgColor="card4"
          />
        </div>
        {showLocation && (
          <div>
            {locationOptions.map((locationOption) => (
              <button
                key={locationOption}
                onClick={() => filterProductsByLocation(locationOption)}
                className={selectedLocation === locationOption ? "selected" : ""}
              >
                {locationOption} (
                {products.filter((product) => product.location === locationOption).length} products)
              </button>
            ))}
            {selectedLocation && (
          <div>
            <h4>{selectedLocation} Products:</h4>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Serial</th>
                  <th>Asset</th>
                  <th>Location</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => {
                  const { _id, name, category, serial, asset, location, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>{serial}</td>
                      <td>{asset}</td>
                      <td>{location}</td>
                      <td>{quantity}</td>
                      <td>{quantity * serial}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                      
                     
                      </td>
                    </tr>
                  );
                })}
              </tbody>
                          <button onClick={unfilterProductsByLocation}>Back</button>
            </table>
            <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
          </div>
        )}
          </div>
        )}
        {showEmptyLocation && (
          <div>
            {locationOptions
              .filter((locationOption) => {
                return (
                  !products.some(
                    (product) => product.location === locationOption
                  ) &&
                  locationOption !== "Cage" // Exclude the special category
                );
              })
              .map((locationOption) => (
                <button
                  key={locationOption}
                  onClick={() => setSelectedLocation(locationOption)}
                  className={
                    selectedLocation === locationOption ? "selected" : ""
                  }
                >
                  {locationOption} (
                  {products.filter(
                    (product) => product.location === locationOption
                  ).length}{" "}
                  products)
                </button>
              ))}
          </div>
        )}
        {showFivePercentProductCounts && (
    <div>
      <h4>Products Under 5% in "Cage" Location:</h4>
      <ul>
        {productsUnderFivePercentInCage.map((productData) => (
          <li key={productData.name}>
            Product: {productData.name}, Quantity: {productData.quantity} and the total of Product is {calculateTotalQuantityByName(productData.name, products)}
          </li>
        ))}
      </ul>
    </div>
  )}
  
     
      </div>
    </div>
  );
};

export default ProductSummary;
