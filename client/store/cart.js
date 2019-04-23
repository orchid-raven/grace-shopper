import axios from 'axios'

const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
export const TEMP_CLEAR_CART = 'TEMP_CLEAR_CART'

const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  cartItems
})

const addToCart = cartItem => ({
  type: ADD_TO_CART,
  cartItem
})

const checkoutCart = cart => ({
  type: CHECKOUT_CART,
  cart
})

const removeFromCart = newCart => ({
  type: REMOVE_FROM_CART,
  newCart
})

export const tempClearCart = () => ({
  type: TEMP_CLEAR_CART
})

export const getCartItemsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(getCartItems(data))
  } catch (error) {
    console.error(error)
  }
}

export const addToCartThunk = product => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/add', {
      id: product.id,
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl
    })
    dispatch(addToCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const checkoutCartThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart/checkout')
    dispatch(checkoutCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const removeFromCartThunk = id => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/delete', {
      id: id
    })

    dispatch(removeFromCart(data))
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
      return {...state, cart: action.cartItems}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.cartItem]}
    case CHECKOUT_CART:
      return {...state, cart: action.cart}
    case REMOVE_FROM_CART:
      return {...state, cart: action.newCart}
    case TEMP_CLEAR_CART:
      return {...state, cart: []}
    default:
      return state
  }
}
