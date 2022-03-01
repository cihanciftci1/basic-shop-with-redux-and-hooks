import alertify from "alertifyjs";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Badge, Button, Row, Table,Col } from 'reactstrap';
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import * as productActions from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts()
  }
  addToCart(product) {
    this.props.actions.addToCart({ product, quantity: 1 });
    alertify.success(product.productName + " added to cart!")
  }
  render() {
    return (
      <div>
        <Row className="align-items-center">
          <Col xs="9">
            <h3>ProductList - {this.props.currentCategory.categoryName}</h3>
          </Col>
          <Col xs="3" className="text-end">
            <Link to={"/saveproduct"}>
              <Badge style={{fontSize: 16}} color="primary">Add Product</Badge>
            </Link>
          </Col>

        </Row>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity Per Unit</th>
              <th>Units In Stock</th>
              <th>Unit Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.id}>
                <th scope='row'>{product.id}</th>
                <td><Link to={"/saveproduct/" + product.id}>{product.productName}</Link></td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>{product.unitPrice}</td>
                <td>
                  <Button onClick={() => this.addToCart(product)} color="success">Add to Cart</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div >
    )
  }
}


function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.listProductsReducer,
    cart: state.cartReducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
