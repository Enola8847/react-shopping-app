import "./App.css";
import Header from "./component/Header";
import Products from "./data/products";
import Cart from "./component/Cart";
function App() {
  return (
    <div className="App">
      <Header />
      <Cart Products={Products} />
    </div>
  );
}
export default App;
