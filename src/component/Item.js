import "../component/Item.css";
import { UseCart } from "../context/CartContext";
export default function item(props) {
  const { id, name, price, image, quantity } = props;
  const { Formatmoney, removeItem, AddQuantity, suptractQuantity } = UseCart();
  return (
    <>
      <div className="Cart-contanier">
        <div className="Cart">
          <img src={image} key={id}></img>
          <div className="name-price">
            ชื่อสินค้า : {name}
            <p>ราคา : {Formatmoney(price)}</p>
          </div>
          <div className="button-contanier">
            <button type="button" onClick={() => AddQuantity(id)}>
              +
            </button>
            <div>
              {" "}
              <input value={quantity} disabled></input>
            </div>
            <button type="button" onClick={() => suptractQuantity(id)}>
              -
            </button>
          </div>
          <div>{Formatmoney(quantity * price)}</div>
          <button className="btn-delete" onClick={() => removeItem(id)}>
            ลบสินค้า
          </button>
        </div>
      </div>
    </>
  );
}
