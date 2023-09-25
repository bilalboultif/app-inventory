import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";

const Dashboard = () => {
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or perform other actions here
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render an error message or fallback UI
      return <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;
  }
}

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
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const [selectedLocation, setSelectedLocation] = useState(null); // Add this line

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductSummary
        products={products}
        locationOptions={locationOptions}
        selectedLocation={selectedLocation} // Pass the selectedLocation prop
        setSelectedLocation={setSelectedLocation} // Pass the setSelectedLocation prop
      />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;