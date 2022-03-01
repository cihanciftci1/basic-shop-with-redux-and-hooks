import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import {Route, Routes} from "react-router-dom";
import CartDetails from "../cart/CartDetails";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";


function App() {
  return (
    <Container>
      <Navi/>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/cart" element={<CartDetails/>} />
        <Route path="/saveproduct/:productId" element={<AddOrUpdateProduct/>}/>
        <Route path="/saveproduct" element={<AddOrUpdateProduct/>}/>
      </Routes>
      
    </Container>
  );
}

export default App;
