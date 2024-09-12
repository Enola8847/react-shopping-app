import products from "../data/products";
import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../reducer/CartReducer";
//สร้าง Context ใหม่ชื่อ CartContext เพื่อใช้สำหรับการแชร์ข้อมูลเกี่ยวกับตะกร้าสินค้าในแอปพลิเคชัน React
const CartContext = createContext();
// กำหนดค่าเริ่มต้นสำหรับสถานะของตะกร้าสินค้า ซึ่งประกอบด้วยรายการสินค้า (products), ยอดรวม (total), และจำนวนรวม (amount)
const initState = {
  products: products,
  total: 0,
  amount: 0,
};
// สร้าง Component CartProvider ที่ใช้ useReducer hook สำหรับจัดการสถานะของตะกร้าสินค้า โดยใช้ cartReducer และค่าเริ่มต้น initState
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  // ฟังก์ชัน Formatmoney ใช้สำหรับจัดรูปแบบจำนวนเงินให้อยู่ในรูปแบบที่อ่านง่าย เช่น 1,000,000.
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
  //   removeItem: ส่งการกระทำ (REMOVE) ไปยัง Reducer เพื่อลบสินค้าจากตะกร้าตาม id
  // AddQuantity: ส่งการกระทำ (ADD) ไปยัง Reducer เพื่อเพิ่มปริมาณของสินค้าตาม id
  // suptractQuantity: ส่งการกระทำ (SUPTRACT) ไปยัง Reducer เพื่อลดปริมาณของสินค้าตาม id
  useEffect(() => {
    console.log("คำนวนยอดรวม");
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.products]);
  // ใช้ useEffect เพื่อคำนวณยอดรวมของตะกร้าสินค้าทุกครั้งที่ state.products มีการเปลี่ยนแปลง โดยการส่งการกระทำ (CALCULATE_TOTAL) ไปยัง Reducer
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
  // ใช้ CartContext.Provider เพื่อให้ Context ที่สร้างขึ้นมีค่าเริ่มต้นและฟังก์ชันที่จำเป็นสำหรับการจัดการตะกร้าสินค้า ซึ่งจะถูกแชร์กับ Component ที่ใช้ CartContext
};
// ฟังก์ชัน UseCart ใช้ useContext hook เพื่อดึงข้อมูลจาก CartContext ซึ่งช่วยให้ Component อื่นๆ เข้าถึงข้อมูลตะกร้าสินค้าและฟังก์ชันที่เกี่ยวข้องได้ง่าย
export const UseCart = () => {
  return useContext(CartContext);
};
