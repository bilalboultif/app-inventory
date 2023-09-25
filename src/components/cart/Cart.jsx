
import React from 'react';

export default function Cart({ cart, setCart }) {
  const getTotalSum = () => {
    return cart.reduce(
        
      (sum, { price, quantity }) => sum + price * quantity ,
      0
    );
  };

 const n = getTotalSum();
   const total = n.toFixed(2);
  
  const clearCart = () => {
    setCart([]);
  };


  const setQuantity = (product, amount) => {
    if (amount === 0) {
        return removeFromCart(product);
    }

    
    const newCart = [...cart];
    newCart.find(
      (item) => item.name === product.name
    ).quantity = amount;
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(
      cart.filter((product) => product !== productToRemove)
    );
  };

  return (
    <>
      <h1>Cart</h1>
      {cart.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
      <div className="products">
        {cart.map((product, idx) => (
          <div className="product" key={idx}>
            <h3>{product.name}</h3>
            <h4>${product.price}</h4>
          
            <img src={product.image.filePath} alt={product.name} style={{ width:'200px', height:'200px'}}  />
          <div style={
            {
                cursor: 'pointer',
            }
          }>
          <button onClick={() => removeFromCart(product)}>
              Remove
            </button>
            <button onClick={() => setQuantity(product, product.quantity + 1)}>+</button>
            <button onClick={() => setQuantity(product, product.quantity - 1)}>-</button>
          </div>
          <div>
          <input id='quantity'
              value={product.quantity}
              onChange={(e) =>
                setQuantity(
                  product,
                  parseInt(e.target.value)
                )
              }
              style={{ 
                width: '50px',
                height: '30px',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '5px',
                outline: 'none',
               
                
                 }}
            />
            </div>
          </div>
        ))}
        <h1 >Total Cost: ${total}</h1>
      </div>

      
    </>
  );
}