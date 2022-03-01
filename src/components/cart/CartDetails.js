import React, { Component } from 'react';
import * as cartActions from "../../redux/actions/cartActions";
import { bindActionCreators } from "redux";
import alertify from "alertifyjs";
import { connect } from 'react-redux';
import { Table,Button } from 'reactstrap';


class CartDetails extends Component {
    removeItem(product) {
        this.props.actions.removeItem(product);
        alertify.error(product.product.productName + " removed from cart!")
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Cart Details</h2>
                <br/>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map(item => (
                            <tr key={item.product.id}>
                                <th scope="row">{item.product.id}</th>
                                <td>{item.product.productName}</td>
                                <td>{item.product.unitPrice}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Button onClick={() => this.removeItem(item)} color="danger">Remove Item</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeItem: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails)