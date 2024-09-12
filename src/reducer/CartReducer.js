import { react } from "react";
import products from "../data/products";
// state: สถานะปัจจุบันของตะกร้าสินค้า
//action: อ็อบเจ็กต์ที่อธิบายถึงการเปลี่ยนแปลงที่ต้องการจะทำกับ state
const cartReducer = (state, action) => {
  //คำนวนสินค้า
  if (action.type === "CALCULATE_TOTAL") {
    const { total, amount } = state.products.reduce(
      (cartTotal, item) => {
        const { price, quantity } = item;
        const totalPrice = price * quantity;
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
  }
  //ลบสินค้าออก
  if (action.type === "REMOVE") {
    return {
      ...state,
      products: state.products.filter((item) => item.id !== action.payload),
    };
  }
  //เพิ่มปริมาณสินค้า
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
  //ลดปริมาณสินค้า
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
