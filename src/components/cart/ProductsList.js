import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../loader/Loader";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getAllProducts,
  } from "../../redux/features/product/productsSlice";
import { Link } from "react-router-dom";

const ProductsList = ({ isLoading,cart, setCart }) => {
    const audio = 'audio';
const electronic = 'electronic';
const All = '';

  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);
 

const products = useSelector(state => state.product.products)

 

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getAllProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const [category, setCategory] = useState(All);
const getAllProductsInCategory = () => {
  return products.filter(
    (product) => product.category === category
  );
};
  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search, category }));
  }, [products, search,category, dispatch]);

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

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

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="product-list">
      <hr />
      <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
             
            />
          </span>

      <h1>Products</h1>
      Select a category
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value={All}>{All}</option>
        <option value={audio}>{audio}</option>
        <option value={electronic}>{electronic}</option>
      </select>
      {!getAllProductsInCategory().length && (
        <div className="no-products">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
        
     
          
  
       
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            
            <table>

       


              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <>
                  
      
                    <tr >
                    
                      <td className="icons">
                       
                        <span>
                 
     
                        <tr key={_id}>
       
          <div className="product" key={_id} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '400px',
            height: '500px',
            border: '1px solid black',
            margin: '10px',
            padding: '10px',
            borderRadius: '50px'
          }}> 
          <span style={{
          
            width: '100%',
            marginTop: '10px',
            marginBottom: '0px',
            marginLeft: "60px"
          }}>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
            <h2 style={{
              marginTop: '0px',
            }}>{product.name}</h2>
            <h4>${product.price}</h4>
            <img src={product.image.filePath} alt={product.name.fileName} style={{
               width:'300px',
                height:'400px'
                
                }} />
            <button onClick={() => addToCart(product)} style={{
              width: '200px',

              height: '60px',
              borderRadius: '50px',
              backgroundColor: 'purple',
              color: 'white',
              marginTop: '20px'

            }}>
              Add to Cart
            </button>
            
          </div>
          </tr> 
                        </span>
                     
                      </td>
                      
                    </tr>
                    </>
                  );
                  
                })}
              </tbody>
            </table>
          )}

        </div>
        </div>
      )} { (
        
        

       
      <div className="products">
        {getAllProductsInCategory().map((product, _id) => (
          <tr key={_id}>
       
       <div className="product" key={_id} style={{
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         width: '400px',
         height: '500px',
         border: '1px solid black',
         margin: '10px',
         padding: '10px',
         borderRadius: '50px'
       }}> 
       <span style={{
       
         width: '100%',
         marginTop: '10px',
         marginBottom: '0px',
         marginLeft: "60px"
       }}>
                       <Link to={`/product-detail/${_id}`}>
                         <AiOutlineEye size={25} color={"purple"} />
                       </Link>
                     </span>
         <h2 style={{
           marginTop: '0px',
         }}>{product.name}</h2>
         <h4>${product.price}</h4>
         <img src={product.image.filePath} alt={product.name.fileName} style={{
            width:'300px',
             height:'400px'
             
             }} />
         <button onClick={() => addToCart(product)} style={{
           width: '200px',

           height: '60px',
           borderRadius: '50px',
           backgroundColor: 'purple',
           color: 'white',
           marginTop: '20px'

         }}>
           Add to Cart
         </button>
       </div>
       </tr>
        ))}
      </div>
     )  }
      <div className="table">
       
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
    </div>
  );
};

export default ProductsList;