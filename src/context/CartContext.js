import products from "../data/products";
import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../reducer/CartReducer";

const CartContext = createContext({
  products: [],
  total: 0,
  amount: 0,
  Formatmoney: (money) => money.toString(),
});

const initState = {
  products: products,
  total: 0,
  amount: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);

  function Formatmoney(money) {
    return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }

  useEffect(() => {
    console.log("คำนวนยอดรวม");
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.products]);

  return (
    <CartContext.Provider value={{ ...state, Formatmoney }}>
      {children}
    </CartContext.Provider>
  );
};

export const UseCart = () => {
  return useContext(CartContext);
};
