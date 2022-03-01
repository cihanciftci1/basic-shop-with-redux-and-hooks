import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, NavItem, Badge } from "reactstrap";
import * as cartActions from "../../redux/actions/cartActions";
import { bindActionCreators } from "redux";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";


class ShowCart extends Component {
    removeItem(product) {
        this.props.actions.removeItem(product);
        alertify.error(product.product.productName + " removed from cart!")
    }
    renderEmpty() {
        return (
            <div>
                <NavItem>Empty Cart</NavItem>
            </div>
        )
    }
    renderCart() {
        return (
            <div>
                <UncontrolledDropdown inNavbar nav>
                    <DropdownToggle caret nav>
                        Cart - {this.props.cart.length}
                    </DropdownToggle>
                    <DropdownMenu end>
                        {this.props.cart.map(item => (
                            <DropdownItem key={item.product.id}>
                                {item.product.productName} - {item.quantity}
                                <Badge onClick={() => this.removeItem(item)} color='danger'>X</Badge>
                            </DropdownItem>
                        ))}
                        <DropdownItem>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem size='lg'>
                            <Link to={"/cart"}>
                                <Badge color='warning'>Cart Details</Badge>
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.props.cart.length > 0 ? this.renderCart() : this.renderEmpty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowCart)