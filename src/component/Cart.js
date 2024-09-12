import { UseCart } from "../context/CartContext";
import Item from "../component/Item";
export default function Cart() {
  const { products, total, Formatmoney } = UseCart();

  return (
    <div className="Cart-contanier">
      <h1 style={{ textAlign: "center" }}>
        {products.length > 0
          ? `ยอดรวม : ${Formatmoney(total)} `
          : "ไม่มีสินค้าในตะกร้า"}
      </h1>
      {products.map((data) => {
        return <Item key={data.id} {...data} />;
      })}
    </div>
  );
}
