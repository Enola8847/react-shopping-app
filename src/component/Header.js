import "./Header.css";
import { UseCart } from "../context/CartContext";
export default function Header() {
  const { amount } = UseCart();
  return (
    <header>
      <p>Shopping App</p>
      <p>สินค้าในตะกล้า : {amount}</p>
    </header>
  );
}
