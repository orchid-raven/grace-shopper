import axios from 'axios'

const GET_CART_ITEMS = 'GET_CART_ITEMS'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

const getCartItems = allCartItems => ({
  type: GET_CART_ITEMS,
  allCartItems
})
const deteleCartItem = productId => ({
  type: DELETE_CART_ITEM,
  productId
})
export const getAllCartItemsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(getCartItems(data))
  } catch (error) {
    console.error(error)
  }
}
export const deleteCartItemThunk = productId => async dispatch => {
  try {
    console.log(productId)
    let {data} = await axios.put('/api/cart/delete', {
      id: productId
    })
    dispatch(deteleCartItem(productId))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  cart: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {...state, cart: action.allCartItems}
    case DELETE_CART_ITEM:
      //   let newCart = []
      //   console.log('old state --> ', state.cart)
      //   console.log('product id --> ', action.productId)
      let productToRemove = state.cart.find(cartItem => {
        if (Number(cartItem.id) === Number(action.productId)) {
          return cartItem
        }
      })
      console.log('product to remove', productToRemove)
      let indexOfProduct = state.cart.indexOf(productToRemove)
      console.log('indexOfProduct', indexOfProduct)
      let newCart = [...state.cart].splice(indexOfProduct, 1)
      console.log('newCart', newCart)
      return {...state, cart: newCart}
    //   console.log('new cart ---> ', newCart)

    default:
      return state
  }
}
