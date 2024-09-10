const cartReducer = (state, action) => {
  switch (action.type) {
    case "CALCULATE_TOTAL":
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
};

export default cartReducer;
