import { UseCart } from "../context/CartContext";
import Item from "../component/Item";
export default function Cart() {
  const { products, total } = UseCart();

  return (
    <div className="Cart-contanier">
      <h1>ยอดรวม : {total}</h1>
      {products.map((data) => {
        return <Item key={data.id} {...data} />;
      })}
    </div>
  );
}
