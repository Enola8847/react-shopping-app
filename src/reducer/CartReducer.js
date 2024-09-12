import { act } from "react";
import products from "../data/products";

const cartReducer = (state, action) => {
  if (action.type === "CALCULATE_TOTAL") {
    const { total, amount } = state.products.reduce(
      (cartTotal, item) => {
        const { price, quantity } = item; // ตรวจสอบว่ามีการพิมพ์ผิดหรือไม่
        const totalPrice = price * quantity; // ตรวจสอบว่ามีการพิมพ์ผิดหรือไม่
        cartTotal.total += totalPrice;
        cartTotal.amount += quantity;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    return {
      ...state,
      total,
      amount,
    };

    // จัดการกรณีอื่น ๆ ที่อาจเกิดขึ้น
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      products: state.products.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === "ADD") {
    let updateProduct = state.products.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      products: updateProduct,
    };
  }
  if (action.type === "SUPTRACT") {
    let updateProduct = state.products
      .map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);
    return {
      ...state,
      products: updateProduct,
    };
  }
};

export default cartReducer;
