import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

// Gameplan - Create a table that lists each product details for the checked out order

// Table will have these columns:
//  - Item Name
//  - Quantity
//  - Price
//  - Item Total

// The way we pull from our redux may get dicey, so let's discuss this together!

class OrderReceipt extends Component {

  componentDidMount() {

  }

  render(){
    // let {products} =  this.props.order
    return (
    <div>
      <h3>Order Receipt</h3>
      <h5>Invoice Number: {/* order.id */}</h5>
      <table className = "ReceiptTable">
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Item Total</th>
        </tr>

        {/* products.map(product => (

          <tr>
            <td>product.name</td>
            <td>product['order-product']['quantity']</td>
            <td>`$${product.price}`</td>
            <td>`$${product['order-product']['price']}`</td>
          </tr>

          ))
        */}
        {/*

          <tr>
            <td colspan="3">Grand Total: </td>
            <td>`$${order.totalPrice}`</td>
          </tr>

        */}


          <tr>
            <td>Rose</td>
            <td>1</td>
            <td>$12.00</td>
            <td>$12.00</td>
          </tr>

          <tr>
            <td colSpan="3">Grand Total: </td>
            <td>$12.00</td>
          </tr>

      </table>
    </div>);
  }
}



export default OrderReceipt;
