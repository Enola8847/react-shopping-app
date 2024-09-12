import products from "../data/products";
import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../reducer/CartReducer";

const CartContext = createContext();

const initState = {
  products: products,
  total: 0,
  amount: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);

  function Formatmoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function removeItem(id) {
    dispatch({ type: "REMOVE", payload: id });
  }
  function AddQuantity(id) {
    dispatch({ type: "ADD", payload: id });
  }
  function suptractQuantity(id) {
    dispatch({ type: "SUPTRACT", payload: id });
  }
  useEffect(() => {
    console.log("คำนวนยอดรวม");
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.products]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        Formatmoney,
        removeItem,
        AddQuantity,
        suptractQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const UseCart = () => {
  return useContext(CartContext);
};
